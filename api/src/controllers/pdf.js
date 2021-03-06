const db = require('../models')
const { filePath, saveFile, removeFile } = require('../utils/file-storage')
const { hashFile } = require('../utils/hash')
const { sendInvitationMail, sendSignatureNotificationMail } = require('../utils/mail')
const { ensureThumbnail } = require('../utils/thumbnail')
const { validateConfiguration } = require('../utils/config')
const { PDFDocument, rgb } = require('pdf-lib')
const fs = require('fs')
const { Op } = require('sequelize')

async function getPdfList(req, res) {
    const documentList = await db.Document.findAll({
        attributes: ['id', 'name'],
        where: {
            ownerId: req.user.id
        }
    })

    const documentListData = documentList.map(s => s.toJSON())

    for (const document of documentListData) {
        const signatories = await db.Signatory.findAll({
            where: {
                documentId: document.id
            }
        })

        const signedSignatories = signatories.filter(s => s.signed)

        document.nbSigned = signedSignatories.length
        document.nbTotal = signatories.length
        document.signed = signedSignatories.length === signatories.length
    }

    res.json(documentListData)
}

async function getPdfThumbnailById(req, res, next) {
    const pdf = await db.Document.findByPk(req.params.id)

    if (pdf === null || pdf.ownerId !== req.user.id) {
        return next(new Error(`Cannot found PDF with id ${req.params.id}`))
    }

    try {
        const thumbnailPath = await ensureThumbnail(pdf.filename)
        res.download(thumbnailPath, thumbnailPath.split('/').pop())
    } catch (err) {
        return next(err)
    }
}

async function getPdfById(req, res, next) {
    const pdf = await db.Document.findByPk(req.params.id)

    if (pdf === null || pdf.ownerId !== req.user.id) {
        return next(new Error(`Cannot found PDF with id ${req.params.id}`))
    }

    res.download(filePath(pdf.filename), pdf.originalName)
}

async function getPdfByToken(req, res, next) {
    const pdf = await db.Document.findByPk(req.signatory.documentId)
    if (pdf === null) {
        return next(new Error('No document was found'))
    }

    res.download(filePath(pdf.filename), pdf.originalName)
}

async function getPdfInfoByToken(req, res, next) {
    const pdf = await db.Document.findByPk(req.signatory.documentId, {
        include: [
            {
                model: db.User,
                attributes: ['email'],
                as: 'owner'
            },
            {
                model: db.Configuration,
                attributes: ['description', 'data', 'showOtherSignatures'],
                as: 'configuration'
            }
        ]
    })

    if (pdf === null) {
        return next(new Error('Cannot find PDF for you'))
    }
    const otherSignatories = await db.Signatory.findAll({
        where: {
            id: {
                [Op.ne]: req.signatory.id
            },
            documentId: pdf.id
        }
    })

    const data = pdf.toJSON()
    data.signatory = req.signatory
    data.otherSignatories = otherSignatories
    data.configuration.data = JSON.parse(JSON.parse(data.configuration.data))

    res.json(data)
}

async function uploadPdf(req, res, next) {
    if (!req.file) {
        return next(new Error('No file found in the request'))
    }

    if (!req.body.name) {
        return next(new Error('No name given for the file'))
    }

    if (!req.body.configuration) {
        return next(new Error('No configuration given for the file'))
    }

    const owner = await db.User.findByPk(req.user.id)
    const signatoriesData = JSON.parse(req.body.signatories)
    let configuration = undefined
    let document = undefined
    let signatories = []

    if (!signatoriesData || !(signatoriesData instanceof Array) || signatoriesData.length <= 0 || signatoriesData.some(s => !s.email)) {
        return next(new Error('There must be at least one signatory in an array of object with an email field'))
    }

    const cleanup = async () => {
        for (const signatory of signatories) {
            await signatory.destroy()
        }
        await document?.destroy()
        await configuration?.destroy()
    }
    try {
        validateConfiguration(JSON.parse(req.body.configuration))

        configuration = await db.Configuration.create({
            description: req.body.description,
            showOtherSignatures: req.body.showOtherSignatures,
            data: JSON.stringify(req.body.configuration)
        })
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot create a new configuration from given data : ${err.message}`))
    }
    try {
        document = await db.Document.create({
            name: req.body.name,
            originalName: req.file.originalname,
            ownerId: owner.getDataValue('id'),
            configurationId: configuration.getDataValue('id')
        })
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot create a new document with given data : ${err.message}`))
    }

    try {
        saveFile(`${document.id}_${req.file.originalname}`, req.file.buffer)
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot save file ${req.file.originalname} : ${err.message}`))
    }

    await document.update({ hash: hashFile(document.filename) })

    for (const signatory of signatoriesData) {
        try {
            const createdSignatory = await db.Signatory.create({
                email: signatory.email,
                documentId: document.getDataValue('id')
            })
            signatories.push(createdSignatory)
        } catch (err) {
            await cleanup()
            return next(new Error(`Cannot create a new signatory with mail ${signatory.email} : ${err.message}`))
        }
    }

    try {
        await sendInvitationMail(owner, signatories, document, configuration, `${req.hostname}/app/sign`)
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot send an email invitation to a signatory : ${err.message}`))
    }
    res.json({
        msg: 'success'
    })
}

async function deletePdf(req, res, next) {
    const document = await db.Document.findByPk(req.params.id)
    if (!document) {
        return next(new Error(`Cannot find a PDF with id ${req.params.id}`))
    }

    const configuration = (await db.Configuration.findByPk(document.configurationId))

    try {
        removeFile(document.filename)
    } catch (err) {
        return next(new Error(`Cannot remove the file : ${err.message}`))
    }

    await document.destroy()
    await configuration.destroy()

    res.json({
        msg: 'success'
    })
}

async function signPdf(req, res, next) {
    const data = req.body.data
    if (!data) {
        return next(new Error('Signature data must be given to sign the document'))
    }

    const signatory = req.signatory
    const document = await db.Document.findByPk(signatory.documentId, {
        include: {
            model: db.User,
            as: 'owner'
        }
    })

    signatory.signed = true
    signatory.data = data
    await signatory.save()
    try {
        await sendSignatureNotificationMail(signatory, document)
    } catch (err) {
        return next(err)
    }

    res.json({ msg: 'ok' })
}

async function getSignedPdf(req, res, next) {
    try {
        const document = await db.Document.findByPk(req.params.id, {
            include: {
                model: db.Configuration,
                as: 'configuration'
            }
        })
        const signatories = await db.Signatory.findAll({
            where: {
                documentId: document.id
            }
        })

        const pdf = await PDFDocument.load(fs.readFileSync(filePath(document.filename)))

        for (const signatory of signatories) {
            if (signatory.data !== null) {
                for (const signature of signatory.data) {
                    const page = pdf.getPage(signature.page - 1)
                    const width = page.getWidth()
                    const height = page.getHeight()

                    for (const { from, to } of signature.signature) {
                        page.drawLine({
                            start: { x: from.x * width, y: (1.0 - from.y) * height },
                            end: { x: to.x * width, y: (1.0 - to.y) * height },
                            thickness: 1,
                            color: rgb(0.0, 0.0, 0.0),
                            opacity: 1
                        })
                    }
                }
            }
        }

        res
            .setHeader('Content-Type', 'application/pdf')
            .setHeader('Content-disposition', 'attachment; filename=' + document.originalName)
            .send(Buffer.from(await pdf.save()))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getPdfById,
    getPdfByToken,
    getPdfInfoByToken,
    getPdfList,
    getPdfThumbnailById,
    getSignedPdf,
    uploadPdf,
    deletePdf,
    signPdf
}