module.exports = (db, config) => {
    const router = require('express').Router()
    const pdf = require('../controllers/pdf')(db, config)

    router
        .get('/list', pdf.getPdfList)
        .get('/file/:id', pdf.getPdfById)
        .get('/thumbnail/:id', pdf.getPdfThumbnailById)

    return router
}