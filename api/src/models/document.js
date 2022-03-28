const { Model, DataTypes } = require('sequelize')

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

    return Document
}