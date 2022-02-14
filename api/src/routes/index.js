const express = require('express')

module.exports = (db) => {
    const router = express.Router()

    console.log(db.sequelize.options.dialect)

    router
        .get('/', (req, res) => {
            res.send('Hello from Express')
        })
        .use((req, res) => {
            res.redirect('/')
        })

    return router
}