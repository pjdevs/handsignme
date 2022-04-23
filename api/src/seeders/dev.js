const { Op } = require('sequelize')

module.exports = {
    async up(queryInterface) {
        const users = [
            {
                id: 0,
                email: 'test@mail.com',
                password: '$2b$10$8bA0qkhDuMacZ8/PQbsmkuMiOCCRRW1SV1k0RkuJUXyuOHHtTPerW', // = 'test'
                salt: '$2b$10$8bA0qkhDuMacZ8/PQbsmku',
                isAdmin: true
            }
        ]
        const configurations = [
            {
                id: 0,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: false,
                data: JSON.stringify([
                    {
                        email: 'foo1@bar.com',
                        signature: {
                            rect: {
                                x: 0.65,
                                y: 0.85,
                                width: 0.3,
                                height: 0.1,
                                color: 'purple'
                            },
                            color: 'black'
                        },
                        page: 1
                    },
                    {
                        email: 'foo2@bar.com',
                        signature: {
                            rect: {
                                x: 0.25,
                                y: 0.85,
                                width: 0.3,
                                height: 0.1,
                                color: 'red'
                            },
                            color: 'black'
                        },
                        page: 1
                    }
                ])
            },
            {
                id: 1,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: true
            }

        ]
        const documents = [
            {
                id: 0,
                name: 'Cahier des charges',
                originalName: 'CDC_HSM_v2.pdf',
                filename: '0_CDC_HSM_v2.pdf',
                hash: '6004fc053f2ae597928f2d9cc6c052b6',
                ownerId: 0,
                configurationId: 0
            },
            {
                id: 1,
                name: 'Sample PDF',
                originalName: 'sample.pdf',
                filename: '1_sample.pdf',
                hash: '4b41a3475132bd861b30a878e30aa56a',
                ownerId: 0,
                configurationId: 1
            }
        ]
        const signatories = [
            {
                id: 0,
                email: 'foo1@bar.com',
                documentId: 0,
                signed: false,
                token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            },
            {
                id: 1,
                email: 'foo2@bar.com',
                documentId: 0,
                signed: false,
                token: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
            },
            {
                id: 2,
                email: 'test2@mail.com',
                documentId: 1,
                signed: true,
                token: 'cccccccccccccccccccccccccccccccc'
            }
        ]

        await queryInterface.bulkInsert('Users', users)
        await queryInterface.bulkInsert('Configurations', configurations)
        await queryInterface.bulkInsert('Documents', documents)
        await queryInterface.bulkInsert('Signatories', signatories)
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Documents', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Configurations', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Signatories', { id: { [Op.or]: [0, 1, 2] } })
        await queryInterface.bulkDelete('Users', { id: { [Op.or]: [0, 1] } })
    }
}
