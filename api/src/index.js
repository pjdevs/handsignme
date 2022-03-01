const express = require('express')
const routes = require('./routes')
const db = require('./db')

const port = process.env.PORT || 8000
const app = express()
app.disable('x-powered-by')

app.use('/api', routes(db))

const server = app.listen(port, () => {
    const adress = server.address()
    console.log(`HandSignMe API listenning on ${adress.address}::${adress.port}`)
})