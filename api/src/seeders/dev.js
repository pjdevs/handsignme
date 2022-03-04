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
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Users', {email: 'test@mail.com'})
        await queryInterface.bulkDelete('Files', {name: {[Op.or]: ['Cahier des charges', 'Sample PDF']}})
    }
}
