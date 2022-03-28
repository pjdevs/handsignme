const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Signatory extends Model {
    }

    Signatory.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        signed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Signatory',
        tableName: 'Signatories',
        timestamps: false
    })

    return Signatory
}