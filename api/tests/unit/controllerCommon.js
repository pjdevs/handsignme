const { mockResponse, mockRequest } = require('jest-mock-req-res')
const db = require('../../src/models')
const config = require('../../src/config')

module.exports = (() => {
    const req = mockRequest()
    const res = mockResponse()

    db.sequelize.sync({ force: true })

    req.app.settings = {
        db: db,
        config: config
    }

    return { req, res }
})()