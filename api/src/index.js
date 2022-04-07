const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routes = require('./routes')
const config = require('./config')
const passport = require('./middlewares/passport')
const bodyParser = require('./middlewares/bodyParser')
const morgan = require('morgan')

const app = express()
app.disable('x-powered-by')

app.use(morgan('common'))
app.use(cookieParser())
app.use(bodyParser.json)
app.use(bodyParser.urlencoded)
app.use(session({
    secret: '4564f6s4fdsfdfd',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes)

const server = app.listen(config.server.port, config.server.host, () => {
    const adress = server.address()
    console.log(`HandSignMe API running on ${adress.address}::${adress.port} in ${process.env.NODE_ENV || 'development'} mode`)
})