module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
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
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users')
    }
}