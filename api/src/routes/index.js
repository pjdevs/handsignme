module.exports = (db, config, middlewares) => {
    const router = require('express').Router()
    const pdf = require('./pdf')(db, config, middlewares)

    router
        .use('/pdf', pdf)
        .use((req, res) => {
            res.status(404).json({
                error: {
                    message: `${req.url} not found`
                }
            })
        })

    return router
}