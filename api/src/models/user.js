const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model {
    }

    User.init({
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    })

    return User
}