const { Op } = require('sequelize')

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Users', [
            {
                id: 0,
                email: 'test@mail.com'
            }
        ])

        await queryInterface.bulkInsert('Configurations', [
            {
                id: 0,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: false,
                data: '{}'
            },
            {
                id: 1,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: true
            }
        ])

        await queryInterface.bulkInsert('Documents', [
            {
                id: 0,
                name: 'Cahier des charges',
                filename: 'CDC_HSM_v2.pdf',
                hash: '6004fc053f2ae597928f2d9cc6c052b6',
                ownerId: 0,
                configurationId: 0
            },
            {
                id: 1,
                name: 'Sample PDF',
                filename: 'sample.pdf',
                hash: '4b41a3475132bd861b30a878e30aa56a',
                ownerId: 0,
                configurationId: 1
            }
        ])

        await queryInterface.bulkInsert('Signatories', [
            {
                id: 0,
                email: 'test0@mail.com',
                documentId: 0,
                signed: true
            },
            {
                id: 1,
                email: 'test1@mail.com',
                documentId: 0,
                signed: true
            },
            {
                id: 2,
                email: 'test2@mail.com',
                documentId: 1,
                signed: false
            }
        ])
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Documents', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Configurations', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Signatories', { id: { [Op.or]: [0, 1, 2] } })
        await queryInterface.bulkDelete('Users', { id: { [Op.or]: [0, 1] } })
    }
}
