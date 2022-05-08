const pdf = require('../../src/controllers/pdf')
const db = require('../../src/models')
const { mockResponse, mockRequest } = require('jest-mock-req-res')

function emptyFunction(err) {
    let a = err
    err = a
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
                    configurationId: 0,
                    signed: true,
                    nbSigned: 0,
                    nbTotal: 0
                }
            ]

            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.getPdfList(req, res)

            expect(res.json)
                .toHaveBeenCalledWith(myFiles.map(file => ({
                    id: file.id,
                    name: file.name,
                    signed: file.signed,
                    nbSigned: 0,
                    nbTotal: 0
                })))
        }),
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

    describe('Ge the PDF Thumbnail by ID', () => {
        it('Pdf not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await pdf.getPdfThumbnailById(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Pdf not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            const myFiles = [
                {
                    id: 1,
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
            req.params.id = 1
            req.user = { 'id': 0 }
            await pdf.getPdfThumbnailById(req, res, next)
            expect(res.download).toHaveBeenCalledTimes(1)
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
        }),
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
        }),
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

    describe('Get the PDF by id', () => {
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
            await pdf.getPdfById(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('The document is  found', async () => {
            const req = mockRequest()
            const res = mockResponse()
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
            req.params = { id: 12 }
            req.user = { id: 0 }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await pdf.getPdfById(req, res, next)
            expect(res.download).toHaveBeenCalledTimes(1)
        })
    })

    describe('Get the PDF by token', () => {
        it('The document is not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.signatory = { documentId: 0 }
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
            await pdf.getPdfByToken(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
    })

    describe('Upload pdf', () => {
        it('The document is not found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('No name given for the file', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file = {}
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('No configuration found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file = {}
            req.body.name = {}
            req.body.signatories = '{ }'
            req.user = { id: 0 }
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('No signatory found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file = {}
            req.body.name = {}
            req.body.signatories = '{ }'
            req.body.configuration = '{}'
            req.user = { id: 0 }
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Configuration cannot be create', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file = {}
            req.body.name = {}
            req.body.signatories = '[ { "id": 1, "email": "test1@mail.com" } , { "id": 3, "email":"test2@mail.com" } ]'
            req.body.configuration = '{}'
            req.user = { id: 0 }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Document cannot be create', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file = {}
            req.body.name = {}
            req.body.signatories = '[ { "id": 1, "email": "test1@mail.com" } , { "id": 3, "email":"test2@mail.com" } ]'
            req.body.description = ''
            req.body.showOtherSignatures = {}
            req.body.configuration = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            req.user = { id: 0 }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('File cannot be save', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.file =
                {
                    id: 1,
                    name: 'File',
                    originalname: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            req.body.name = ' '
            req.body.signatories = '[ { "id": 1, "email": "test1@mail.com" } , { "id": 3, "email":"test2@mail.com" } ]'
            req.body.description = ''
            req.body.showOtherSignatures = {}
            req.body.configuration = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            req.user = { id: 0 }
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            const next = jest.fn(emptyFunction)
            await pdf.uploadPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
    })

    describe('Sign the PDF', () => {
        it('No data to sign', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await pdf.signPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('No data to sign', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.body.data = {}
            req.signatory = { documentId: 1, save: jest.fn() }
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
            const next = jest.fn(emptyFunction)
            await pdf.signPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
    })

    describe('Get signed PDF', () => {
        it('No document found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            req.params.id = {}
            await pdf.getSignedPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('No data to sign', async () => {
            const req = mockRequest()
            const res = mockResponse()
            req.body.data = {}
            req.signatory = { documentId: 1, save: jest.fn() }
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
            const next = jest.fn(emptyFunction)
            await pdf.getSignedPdf(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        })
    })
})