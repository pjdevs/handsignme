module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Documents', {
            fileId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Files',
                    key: 'id'
                }
            },
            configurationId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Files',
                    key: 'id'
                }
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Documents')
    }
}