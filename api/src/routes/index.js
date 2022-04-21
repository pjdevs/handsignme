const router = require('express').Router()
const pdf = require('./pdf')
const auth = require('./auth')
const admin = require('./admin')
const token = require('./token')

router
    .use('/pdf', pdf)
    .use('/auth', auth)
    .use('/admin', admin)
    .use('/token', token)
    .use((req, res) => {
        res.status(404).json({
            error: {
                name: 'Not Found',
                msg: `${req.url} not found`,
                text: 'Url not found'
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