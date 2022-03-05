const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model {
    }

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    })

    return User
}