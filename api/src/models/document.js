const { Model } = require('sequelize')

module.exports = (sequelize) => {
    class Document extends Model {
    }

    Document.init({
    }, {
        sequelize,
        modelName: 'Document',
        tableName: 'Documents',
        timestamps: false
    })

    return Document
}