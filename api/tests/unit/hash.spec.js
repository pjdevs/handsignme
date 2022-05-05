const hash = require('../../src/utils/hash')

describe('Hash Functions', () => {
    describe('Hash FIle', () => {
        it('Catch error', () => {
            const rest = hash.hashFile('test.pdf')
            expect(rest).toBe('')
        })
    })

    describe('Hash Token', () => {
        it('It gives a valid hash token', () => {
            const user = { id: 1, email: 'test@mail.com' }
            const signatory = { id: 3, email: 'test2@mail.com' }
            const document = { id: 2 }

            const hashToken = hash.hashToken(user, signatory, document, 4)
            expect(hashToken).toBe('23e40fa4aa765152a4f9364036f07d12')
        })

        it('We can verify the length of the token', () => {
            const user = { id: 1, email: 'test@mail.com' }
            const signatory = { id: 18, email: 'test2@mail.com' }
            const document = { id: 2 }

            const hashToken = hash.hashToken(user, signatory, document)
            expect(hashToken).toHaveLength(32)
        })
    })
})