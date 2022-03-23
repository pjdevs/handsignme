const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldNameSize: 100,
        fileSize: 5000000
    }
})

module.exports = upload