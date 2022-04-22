const router = require('express').Router()
const pdf = require('../controllers/pdf')
const upload = require('../middlewares/upload')
const { isAuthenticated, isSignatory } = require('../middlewares/auth')

router
    .get('/list', isAuthenticated, pdf.getPdfList)
    .get('/file/:id', isAuthenticated, pdf.getPdfById)
    .get('/file', isSignatory, pdf.getPdfByToken)
    .get('/info', isSignatory, pdf.getPdfInfoByToken)
    .get('/thumbnail/:id', isAuthenticated, pdf.getPdfThumbnailById)
    .post('/upload', isAuthenticated, upload.single('file'), pdf.uploadPdf)
    .get('/delete/:name', isAuthenticated, pdf.deletePdf)
    .post('/sign', isSignatory, pdf.signPdf)
    .get('/signed/:id', pdf.getSignedPdf)

module.exports = router