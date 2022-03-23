const path = require('path')
const base = path.normalize(__dirname + '/../..')
const fs = require('fs')
const config = require('../config')
const db = require('../models')

async function getPdfList(req, res) {
    const pdfList = await db.File.findAll({
        attributes: ['id', 'name']
    })

    res.json(pdfList.map(file => file.dataValues))
}

async function getPdfThumbnailById(req, res) {
    const pdf = await db.File.findByPk(req.params.id)
    const file = `${pdf.file}.thumb.png`

    res.download(`${base}/${config.storage.thumbnailsPath}/${file}`, file)
}

async function getPdfById(req, res) {
    const pdf = await db.File.findByPk(req.params.id)

    res.download(`${base}/${config.storage.filesPath}/${pdf.file}`, pdf.file)
}

async function uploadPdf(req, res) {
    await db.File.create({ name: 'Test', file: req.file.originalname, ownerId: 0 })

    fs.writeFile(`${base}/${config.storage.filesPath}/${req.file.originalname}`, req.file.buffer, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/app')
        }
    })
}

async function deletePdf(req, res) {
    const name = req.params.name
    fs.unlink(`${base}/${config.storage.filesPath}/${name}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    })
    res.json({ msg: 'success' })
}

module.exports = {
    getPdfById,
    getPdfList,
    getPdfThumbnailById,
    uploadPdf,
    deletePdf
}