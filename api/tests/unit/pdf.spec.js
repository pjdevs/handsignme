const pdf = require('../../src/controllers/pdf')
const db = require('../../src/models')

describe('PDF Controller', () => {
    describe('Queries the PDF list', () => {
        it('Send the exact current list', async () => {
            const { req, res } = require('./controllerCommon')

            const myFiles = [
                { id: 12, name: 'File', file: 'file.pdf', owner: { email: 'test@mail.com' } }
            ]

            await db.sequelize.sync({ force: true })
            await db.File.create(myFiles[0], { include: [db.File.User] })
            await pdf.getPdfList(req, res)

            expect(res.json).toHaveBeenCalledWith(myFiles.map(file => ({ id: file.id, name: file.name })))
        })
    })
})