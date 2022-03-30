module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Documents', {
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
            filename: {
                allowNull: false,
                type: Sequelize.STRING
            },
            hash: {
                type: Sequelize.STRING(32),
                allowNull: false,
                unique: true
            },
            configurationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Configurations',
                    key: 'id'
                }
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
        await queryInterface.dropTable('Documents')
    }
}