const token = require('../../src/controllers/token')
const db = require('../../src/models')
const { mockResponse, mockRequest } = require('jest-mock-req-res')

function emptyFunction(err) {
    let a = err
    err = a
}

describe('Token Controller', () => {
    describe('Validate Email', () => {
        it('No email found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.body.email = 'test2@mail.com'
            const myFile =
                {
                    id: 1,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFile)
            req.signatory = await db.Signatory.create({ id: 0, email: 'test1@mail.com', signed: false, documentId: 1 })
            const next = jest.fn(emptyFunction)
            await token.validateEmail(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Wrong email', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.body.email = 'test1@mail.com'
            const myFile =
                {
                    id: 1,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFile)
            await db.Signatory.create({ id: 0, email: 'test1@mail.com', signed: false, documentId: 1 })
            req.signatory = { id: 1 }
            const next = jest.fn(emptyFunction)
            await token.validateEmail(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
    })
})