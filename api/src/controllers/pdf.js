const db = require('../models')
const { filePath, saveFile, removeFile } = require('../utils/file-storage')
const { sendInvitationMail } = require('../utils/mail')
const { ensureThumbnail } = require('../utils/thumbnail')

async function getPdfList(req, res) {
    const pdfList = await db.Document.findAll({
        attributes: ['id', 'name'],
        where: {
            ownerId: req.user.id
        }
    })

    res.json(pdfList.map(file => file.dataValues))
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
        next(err)
    }
}

async function getPdfById(req, res, next) {
    const pdf = await db.Document.findByPk(req.params.id)

    if (pdf === null || pdf.ownerId !== req.user.id) {
        return next(new Error(`Cannot found PDF with id ${req.params.id}`))
    }

    res.download(filePath(pdf.filename), pdf.filename)
}

async function getPdfByToken(req, res, next) {
    const pdf = await db.Document.findByPk(req.signatory.documentId)

    if (pdf === null) {
        next(new Error('No document was found'))
    }

    res.download(filePath(pdf.filename), pdf.filename)
}

async function getPdfInfoByToken(req, res, next) {
    const pdf = await db.Document.findByPk(req.signatory.documentId, {
        include: [
            db.Document.User,
            db.Document.Configuration
        ]
    })

    if (pdf === null) {
        return next(new Error('Cannot found PDF for you'))
    }

    res.download(filePath(pdf.filename), pdf.filename)
}

async function uploadPdf(req, res, next) {
    if (!req.file) {
        return next(new Error('No file found in the request'))
    }

    if (!req.body.name) {
        return next(new Error('No name given for the file'))
    }

    const owner = await db.User.findByPk(0)
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
        configuration = await db.Configuration.create({
            description: req.body.description,
            showOtherSignatures: req.body.showOtherSignatures,
            data: JSON.stringify({})
        })
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot create a new configuration from given data : ${err.message}`))
    }

    try {
        saveFile(req.file.originalname, req.file.buffer)
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot save file ${req.file.originalname} : ${err.message}`))
    }

    try {
        document = await db.Document.create({
            name: req.body.name,
            filename: req.file.originalname,
            ownerId: owner.getDataValue('id'),
            configurationId: configuration.getDataValue('id')
        })
    } catch (err) {
        await cleanup()
        return next(new Error(`Cannot create a new document with given data : ${err.message}`))
    }

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

module.exports = {
    getPdfById,
    getPdfByToken,
    getPdfInfoByToken,
    getPdfList,
    getPdfThumbnailById,
    uploadPdf,
    deletePdf
}