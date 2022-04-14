const { Model, DataTypes } = require('sequelize')
const { hashFile } = require('../utils/hash')

module.exports = (sequelize) => {
    class Document extends Model {
        async getSignedNumber() {
            const a = await Document.findAll()
            console.log(a.map(doc => doc.name))
            /*const signedList = await this.Document.findAll({
                where: {
                    signed: 0
                }*/
        }

        hashDoc() {
            this.hash = hashFile(this.filename)
        }

        showDoc() {
            console.log(this)
        }
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
            type: DataTypes.STRING(32),
            unique: true
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