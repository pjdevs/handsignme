const admin = require('../../src/controllers/admin')
const db = require('../../src/models')
const { mockResponse, mockRequest } = require('jest-mock-req-res')

function emptyFunction(err) {
    let a = err
    err = a
}

describe('Admin Controller', () => {
    describe('Get the User list', () => {
        it('Send the exact current list', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const Users = [
                {
                    id: 0,
                    email: 'test@mail.com',
                    password: '',
                    salt: ''
                },
                {
                    id: 1,
                    email: 'test1@mail.com',
                    password: 'azerty',
                    salt: ''
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create(Users[0])
            await db.User.create(Users[1])
            await admin.getUserList(req, res)
            expect(res.json)
                .toHaveBeenCalledWith(Users.map(user => ({
                    id: user.id,
                    email: user.email
                })))
        })
    })

    describe('Get the Doc list', () => {
        it('Send the exact current list', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const myFiles = [
                {
                    id: 1,
                    name: 'File',
                    originalName: 'file.pdf',
                    filename: 'file.pdf',
                    ownerId: 0,
                    configurationId: 0
                },
                {
                    id: 2,
                    name: 'File2',
                    originalName: 'file2.pdf',
                    filename: 'file2.pdf',
                    ownerId: 0,
                    configurationId: 0
                }
            ]
            await db.sequelize.sync({ force: true })
            await db.User.create({ id: 0, email: 'test@mail.com', password: '', salt: '' })
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFiles[0])
            await db.Document.create(myFiles[1])
            await admin.getDocList(req, res)
            expect(res.json)
                .toHaveBeenCalledWith(myFiles.map(file => ({
                    id: file.id,
                    name: file.name,
                    ownerId: file.ownerId
                })))
        })
    })

    describe('Delete file', () => {
        it('No document found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await admin.deleteFile(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Remove the file', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            req.params = { id: 1 }
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
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFile)
            await db.Signatory.create({ id: 0, email: 'test1@mail.com', signed: false, documentId: 1 })
            await admin.deleteFile(req, res, next)
            expect(res.json).toHaveBeenCalledWith({ msg: 'Document deleted' })
        })
    })

    describe('Delete user', () => {
        it('No user found', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            await admin.deleteUser(req, res, next)
            expect(next).toHaveBeenCalledTimes(1)
        }),
        it('Remove the file', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = jest.fn(emptyFunction)
            req.params = { id: 0 }
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
            await db.Configuration.create({ id: 0, email: 'test2@mail.com', description: 'A document', showOtherSignatures: false })
            await db.Document.create(myFile)
            await db.Signatory.create({ id: 0, email: 'test1@mail.com', signed: false, documentId: 1 })
            await admin.deleteUser(req, res, next)
            expect(res.json).toHaveBeenCalledWith({ msg: 'User deleted' })
        })
    })
})