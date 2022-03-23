const express = require('express')
const routes = require('./routes')
const config = require('./config')
const bodyParser = require('./middlewares/bodyParser')

const app = express()
app.disable('x-powered-by')

app.use('/api', bodyParser.json)
app.use('/api', bodyParser.urlencoded)
app.use('/api', routes)

const server = app.listen(config.server.port, config.server.host, () => {
    const adress = server.address()
    console.log(`HandSignMe API running on ${adress.address}::${adress.port} in ${process.env.NODE_ENV || 'development'} mode`)
})