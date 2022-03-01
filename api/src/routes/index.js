const express = require('express')
const path = require('path')

module.exports = (db) => {
    const router = express.Router()

    console.log(db.sequelize.options.dialect)

    router
        .get('/', (req, res) => {
            res.send('Hello from Express')
        })
        .get('/pdf/thumbnail/:id', (req, res) => {
            res.sendFile(path.normalize(__dirname + '/../../thumbnails/sample.thumb.png'))
        })
        .get('/pdf/file/:id', (req, res) => {
            res.sendFile(path.normalize(__dirname + '/../../files/sample.pdf'))
        })
        .use((req, res) => {
            res.redirect('/')
        })


    return router
}