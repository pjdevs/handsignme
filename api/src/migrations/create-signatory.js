module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Signatories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            },
            signed: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            documentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Documents',
                    key: 'id'
                }
            },
            token: {
                type: Sequelize.STRING(32),
                unique: true
            },
            data: {
                type: Sequelize.JSON
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Signatories')
    }
}