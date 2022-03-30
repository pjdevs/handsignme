const fs = require('fs')
const config = require('../config')
const db = require('../models')
const { sendInvitationMail } = require('../utils/mail')
const { ensureThumbnail } = require('../utils/thumbnail')

async function getPdfList(req, res) {
    const pdfList = await db.Document.findAll({
        attributes: ['id', 'name'],
        where: {
            ownerId: 0
        }
    })

    res.json(pdfList.map(file => file.dataValues))
}

async function getPdfThumbnailById(req, res, next) {
    const pdf = await db.Document.findByPk(req.params.id)

    if (pdf === null) {
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

    if (pdf === null) {
        return next(new Error(`Cannot found PDF with id ${req.params.id}`))
    }

    res.download(`${config.storage.filesPath}/${pdf.filename}`, pdf.filename)
}

async function uploadPdf(req, res, next) {
    if (!req.file) {
        return next(new Error('No file found in the request'))
    }

    if (!req.body.name) {
        return next(new Error('No name given for the file'))
    }

    const owner = await db.User.findByPk(0)
    const signatories = JSON.parse(req.body.signatories)

    if (!signatories || !(signatories instanceof Array) || signatories.length <= 0 || signatories.some(s => !s.email)) {
        return next(new Error('There must be at least one signatory in an Array'))
    }

    try {
        const configuration = await db.Configuration.create({
            description: req.body.description,
            showOtherSignatures: req.body.showOtherSignatures,
            data: JSON.stringify({})
        })

        fs.writeFileSync(`${config.storage.filesPath}/${req.file.originalname}`, req.file.buffer)

        const document = await db.Document.create({
            name: req.body.name,
            filename: req.file.originalname,
            ownerId: owner.getDataValue('id'),
            configurationId: configuration.getDataValue('id')
        })

        for (const signatory of signatories) {
            await db.Signatory.create({
                email: signatory.email,
                documentId: document.getDataValue('id')
            })
        }

        await ensureThumbnail(document.filename)
        await sendInvitationMail(owner, signatories, document, configuration, '#')

        res.json({
            msg: 'success'
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

async function deletePdf(req, res, next) {
    const name = req.params.name
    fs.unlink(`${config.storage.filesPath}/${name}`, (err) => {
        if (err) {
            return next(err)
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
}

module.exports = {
    getPdfById,
    getPdfList,
    getPdfThumbnailById,
    uploadPdf,
    deletePdf
}