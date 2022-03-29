const fs = require('fs')
const config = require('../config')
const db = require('../models')
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
    if (req.file === undefined) {
        return next(new Error('No file found in the request'))
    }

    if (req.body.name === undefined) {
        return next(new Error('No named given for the file'))
    }

    const configuration = await db.Configuration.create({
        description: req.body.description,
        showOtherSignatures: req.body.showOtherSignatures,
        data: JSON.stringify({})
    })

    console.log(configuration.getDataValue('showOtherSignatures'))
    console.log(configuration.getDataValue('id'))

    await db.Document.create({
        name: req.body.name,
        filename: req.file.originalname,
        ownerId: 0,
        configurationId: configuration.getDataValue('id')
    })

    fs.writeFile(`${config.storage.filesPath}/${req.file.originalname}`, req.file.buffer, (err) => {
        if (err) {
            next(err)
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
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