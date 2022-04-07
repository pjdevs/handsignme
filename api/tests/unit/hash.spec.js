const hash = require('../../src/utils/hash')

describe('Hash Functions', () => {
    describe('Hash Token', () => {
        it('It give an hash token', async () => {
            const user =
                {
                    id: 1,
                    mail: 'test@mail.com'
                }

            const signatory =
                {
                    id: 3,
                    mail: 'test2@mail.com'
                }

            const document = { id: 2 }

            const hashToken = hash.hashToken(user, signatory, document, 4)
            expect(hashToken).toBe('3578d1bc2921e0a01b5162fca23aec4d')
        })
    })
})