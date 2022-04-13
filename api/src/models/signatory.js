const { Model, DataTypes } = require('sequelize')
const { hashToken } = require('../utils/hash')

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
        },
        documentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(32)
        }
    }, {
        sequelize,
        modelName: 'Signatory',
        tableName: 'Signatories',
        timestamps: false
    })

    Signatory.afterCreate(async (signatory) => {
        const document = await sequelize.models.Document.findByPk(signatory.documentId)
        const owner = await sequelize.models.User.findByPk(document.ownerId)

        signatory.token = hashToken(owner.dataValues, signatory, document.dataValues)
    })

    return Signatory
}