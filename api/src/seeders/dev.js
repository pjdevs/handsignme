const { Op } = require('sequelize')

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Users', [
            {
                id: 0,
                email: 'test@mail.com'
            }
        ])

        await queryInterface.bulkInsert('Files', [
            {
                id: 0,
                name: 'Cahier des charges',
                file: 'CDC_HSM_v2.pdf',
                ownerId: 0
            },
            {
                id: 1,
                name: 'Sample PDF',
                file: 'sample.pdf',
                ownerId: 0
            }
        ])

        await queryInterface.bulkInsert('Configurations', [
            {
                id: 0,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: false
            },
            {
                id: 1,
                description: 'Signe mon super PDF stp',
                showOtherSignatures: true,
                data: '{}'
            }
        ])

        await queryInterface.bulkInsert('Documents', [
            {
                fileId: 0,
                configurationId: 0
            },
            {
                fileId: 0,
                configurationId: 1
            },
            {
                fileId: 1,
                configurationId: 1
            }
        ])
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Documents', { fileId: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Configurations', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Files', { id: { [Op.or]: [0, 1] } })
        await queryInterface.bulkDelete('Users', { id: { [Op.or]: [0, 1] } })
    }
}
