const router = require('express').Router()
const pdf = require('../controllers/pdf')
const upload = require('../middlewares/upload')

router
    .get('/list', pdf.getPdfList)
    .get('/file/:id', pdf.getPdfById)
    .get('/thumbnail/:id', pdf.getPdfThumbnailById)
    .post('/upload', upload.single('file'), pdf.uploadPdf)
    .get('/delete/:name', pdf.deletePdf)

module.exports = router