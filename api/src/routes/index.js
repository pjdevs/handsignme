const router = require('express').Router()
const pdf = require('./pdf')

router
    .use('/pdf', pdf)
    .use((req, res) => {
        res.status(404).json({
            error: {
                message: `${req.url} not found`
            }
        })
    })

module.exports = router