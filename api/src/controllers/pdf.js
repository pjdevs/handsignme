const path = require('path')
const base = path.normalize(__dirname + '/../..')
const fs = require('fs')
const config = require('../config')
const db = require('../models')

async function getPdfList(req, res) {
    const pdfList = await db.Document.findAll({
        attributes: ['id', 'name'],
        where: {
            ownerId: 0
        }
    })

    res.json(pdfList.map(file => file.dataValues))
}

async function getPdfThumbnailById(req, res) {
    const pdf = await db.Document.findByPk(req.params.id)
    const file = `${pdf.filename}.thumb.png`

    res.download(`${base}/${config.storage.thumbnailsPath}/${file}`, file)
}

async function getPdfById(req, res) {
    const pdf = await db.Document.findByPk(req.params.id)

    res.download(`${base}/${config.storage.filesPath}/${pdf.filename}`, pdf.filename)
}

async function uploadPdf(req, res, next) {
    if (req.file === undefined) {
        return next(new Error('No file found in the request'))
    }

    await db.Document.create({ name: 'Test', filename: req.file.originalname, ownerId: 0, configurationId: 0 })

    fs.writeFileSync(`${base}/${config.storage.filesPath}/${req.file.originalname}`, req.file.buffer, (err) => {
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
    fs.unlink(`${base}/${config.storage.filesPath}/${name}`, (err) => {
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