const express = require('express')
const routes = require('./routes')
const db = require('./models')
const config = require('./config')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage,
    limits: {
        fieldNameSize: 100,
        fileSize: 1048576
    } })

const app = express()
app.disable('x-powered-by')

app.use('/api', routes(db, config, { upload }))

const server = app.listen(config.server.port, config.server.host, () => {
    const adress = server.address()
    console.log(`HandSignMe API running on ${adress.address}::${adress.port} in ${process.env.NODE_ENV || 'development'} mode`)
})