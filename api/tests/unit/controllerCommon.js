const { mockResponse, mockRequest } = require('jest-mock-req-res')
const db = require('../../src/models')
const config = require('../../src/config')

module.exports = () => {
    const req = mockRequest()
    const res = mockResponse()

    req.app.settings.db = db
    req.app.settings.config = config

    return {
        req: req,
        res: res
    }
}