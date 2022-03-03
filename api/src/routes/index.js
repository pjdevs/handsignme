const express = require('express')

module.exports = (db) => {
    const router = express.Router()

    console.log(db.sequelize.options.dialect)

    router
        .get('/pdf/list', async (req, res) => {
            const pdfList = await db.File.findAll({
                attributes: ['id', 'name']
            })

            res.json(pdfList.map(file => file.dataValues))
        })
        .get('/pdf/thumbnail/:id', async (req, res) => {
            const pdf = await db.File.findByPk(req.params.id)

            res.sendFile(pdf.thumbnail)
        })
        .get('/pdf/file/:id', async (req, res) => {
            const pdf = await db.File.findByPk(req.params.id)

            res.sendFile(pdf.path)
        })
        .use((req, res) => {
            res.status(404).json({
                error: {
                    message: `${req.url} not found`
                }
            })
        })

    return router
}