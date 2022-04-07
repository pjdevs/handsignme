const pdf = require('../../src/controllers/pdf')
const db = require('../../src/models')

describe('PDF Controller', () => {
    describe('Queries the PDF list', () => {
        it('Send the exact current list', async () => {
            const { req, res } = require('./controllerCommon')
            req.user = { id: 0 }

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
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
            const { req, res } = require('./controllerCommon')
            req.user = { id: 1 }

            const myFiles = [
                {
                    id: 12,
                    name: 'File',
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
})