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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    })

    return User
}