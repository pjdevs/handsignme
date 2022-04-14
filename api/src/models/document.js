const { Model, DataTypes } = require('sequelize')
const { hashFile } = require('../utils/hash')

module.exports = (sequelize) => {
    class Document extends Model {
    }

    Document.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true
        },
        originalName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING(32)
        },
        configurationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Document',
        tableName: 'Documents',
        timestamps: false
    })

    Document.afterCreate(async (document) => {
        document.filename = `${document.id}_${document.originalName}`
        await document.save()
    })

    return Document
}