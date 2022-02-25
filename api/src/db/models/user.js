const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model {
    }

    User.init({
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    })

    return User
}