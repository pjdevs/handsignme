const auth = require('../../src/controllers/auth')
const db = require('../../src/models')
const { mockResponse, mockRequest } = require('jest-mock-req-res')

function emptyFunction(err) {
    let a = err
    err = a
}

describe('Auth Controller', () => {
    describe('Sign Up', () => {
        it('Wrong credentials', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await auth.signup(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Passwords do not match', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            req.body.email = {}
            req.body.password = 'test'
            req.body.password2 = 'test2'
            await auth.signup(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('User created', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            req.body.email = 'test@mail.com'
            req.body.password = 'test'
            req.body.password2 = 'test'
            await db.sequelize.sync({ force: true })
            await auth.signup(req, res, next)
            expect(res.json).toHaveBeenCalledWith({ msg: 'success' })
        })
    })

    describe('Logout', () => {
        it('Success', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.logout = emptyFunction
            auth.logout(req, res)
            expect(res.json).toHaveBeenCalledWith({ msg: 'success' })
        })
    })
})