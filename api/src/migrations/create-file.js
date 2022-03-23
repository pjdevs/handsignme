module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            file: {
                allowNull: false,
                type: Sequelize.STRING
            },
            ownerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Files')
    }
}