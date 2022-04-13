const hash = require('../../src/utils/hash')

describe('Hash Functions', () => {
    describe('Hash Token', () => {
        it('It give a valid hash token', () => {
            const user = { id: 1, email: 'test@mail.com' }
            const signatory = { id: 3, email: 'test2@mail.com' }
            const document = { id: 2 }

            const hashToken = hash.hashToken(user, signatory, document, 4)
            expect(hashToken).toBe('3578d1bc2921e0a01b5162fca23aec4d')
        })

        it('It can use a random number', () => {
            const user = { id: 1, email: 'test@mail.com' }
            const signatory = { id: 3, email: 'test2@mail.com' }
            const document = { id: 2 }

            const hashToken = hash.hashToken(user, signatory, document)
            expect(hashToken).toHaveLength(32)
        })
    })
})