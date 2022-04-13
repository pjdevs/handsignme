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

    Document.beforeCreate((document) => {
        document.hash = hashFile(document.filename)
    })

    return Document
}