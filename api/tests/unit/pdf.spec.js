const pdf = require('../../src/controllers/pdf')

describe('PDF Controller', () => {
    describe('Queries the PDF list', () => {
        it('Send the exact current list', () => {
            const { req, res } = require('./controllerCommon')

            pdf.getPdfList(req, res)

            expect(res.send).toHaveBeenCalled()
        })
    })
})