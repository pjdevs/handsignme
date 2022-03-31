const router = require('express').Router()
const pdf = require('./pdf')
const auth = require('./auth')

router
    .use('/pdf', pdf)
    .use('/auth', auth)
    .use((req, res) => {
        res.status(404).json({
            error: {
                message: `${req.url} not found`
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