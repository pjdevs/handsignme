const pdf = require('../../src/controllers/pdf')
const db = require('../../src/models')
const { mockResponse, mockRequest } = require('jest-mock-req-res')

function emptyFunction(err) {
}

describe('PDF Controller', () => {
    describe('Queries the PDF list', () => {
        it('Send the exact current list', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.user = { id: 0 }

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]

            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.getPdfList(req, res)

            expect(res.json).toHaveBeenCalledWith(myFiles.map(file => ({ id: file.id, name: file.name })))
        })

        it('Send an empty list when no document belonging', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.user = { id: 1 }

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]

            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.getPdfList(req, res)

            expect(res.json).toHaveBeenCalledWith([])
        })
    })

    describe('Queries the pdf by token', () => {
        it('The document is not found and the error is sent', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.signatory = { id: 0 }
            const next = jest.fn(emptyFunction)

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.getPdfInfoByToken(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })

        it('The document not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)

            const myFiles = [
                {
                    id: 4,
                    name: 'FileMe',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0,
                    hash: null
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false, data: null })
            await db.Document.create(myFiles[0])
            req.signatory = await db.Signatory.create({ id: 3, email: 'test2@mail.com', documentId: 4, signed: false })
            await pdf.getPdfInfoByToken(req, res, next)
            const call = res.json.mock.calls[0][0]
            expect(call.signatory.id).toBe(3)
            expect(call.id).toBe(4)
        })
    })
    describe('Delete the pdf by id', () => {
        it('The document is not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.params = { id: 0 }
            const next = jest.fn(emptyFunction)

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.deletePdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
        it('The document is not remove', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.params = { id: 12 }
            const next = jest.fn(emptyFunction)

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.deletePdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(0)
        })
    })
})