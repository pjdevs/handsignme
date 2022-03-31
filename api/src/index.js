const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routes = require('./routes')
const config = require('./config')
const { setupPassport } = require('./middlewares/passport')
const bodyParser = require('./middlewares/bodyParser')

const app = express()
app.disable('x-powered-by')

app.use(cookieParser())
app.use(bodyParser.json)
app.use(bodyParser.urlencoded)
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))

setupPassport(app)

app.use('/api', routes)

const server = app.listen(config.server.port, config.server.host, () => {
    const adress = server.address()
    console.log(`HandSignMe API running on ${adress.address}::${adress.port} in ${process.env.NODE_ENV || 'development'} mode`)
})