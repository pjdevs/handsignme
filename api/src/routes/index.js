const express = require('express')
const createControllers = require('../controllers')

module.exports = (db, config) => {
    const router = express.Router()
    const controllers = createControllers(db, config)

    router
        .get('/pdf/list', controllers.pdf.getPdfList)
        .get('/pdf/file/:id', controllers.pdf.getPdfById)
        .get('/pdf/thumbnail/:id', controllers.pdf.getPdfThumbnailById)
        .use((req, res) => {
            res.status(404).json({
                error: {
                    message: `${req.url} not found`
                }
            })
        })

    return router
}