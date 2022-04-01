const router = require('express').Router()
const pdf = require('./pdf')
const auth = require('./auth')
const admin = require('./admin')
const { isAuthenticated } = require('../middlewares/auth')

router
    .use('/pdf', isAuthenticated, pdf)
    .use('/auth', auth)
    .use('/admin', admin)
    .use((req, res) => {
        res.status(404).json({
            error: {
                msg: `${req.url} not found`
            }
        })
    })
    // eslint-disable-next-line no-unused-vars
    .use((err, req, res, next) => {
        res.status(err.status || 500)
            .json({
                error: {
                    name: err.name,
                    msg: err.message,
                    text: err.toString()
                }
            })
    })

module.exports = router