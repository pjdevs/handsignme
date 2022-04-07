const router = require('express').Router()
const pdf = require('../controllers/pdf')
const upload = require('../middlewares/upload')
const { isAuthenticated } = require('../middlewares/auth')

router
    .get('/list', isAuthenticated, pdf.getPdfList)
    .get('/file/:id', pdf.getPdfById)
    .get('/thumbnail/:id', isAuthenticated, pdf.getPdfThumbnailById)
    .post('/upload', isAuthenticated, upload.single('file'), pdf.uploadPdf)
    .get('/delete/:name', isAuthenticated, pdf.deletePdf)

module.exports = router