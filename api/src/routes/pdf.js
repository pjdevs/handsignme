module.exports = (db, config, middlewares) => {
    const router = require('express').Router()
    const pdf = require('../controllers/pdf')(db, config, middlewares)

    router
        .get('/list', pdf.getPdfList)
        .get('/file/:id', pdf.getPdfById)
        .get('/thumbnail/:id', pdf.getPdfThumbnailById)
        .post('/upload', middlewares.upload.single('myfile'), pdf.uploadPdf)

    return router
}