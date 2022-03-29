module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Configurations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            data: {
                allowNull: true,
                type: Sequelize.JSON
            },
            description: {
                type: Sequelize.TEXT
            },
            showOtherSignatures: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Configurations')
    }
}