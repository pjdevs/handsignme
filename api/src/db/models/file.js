const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class File extends Model {
    }

    File.init({
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'File',
        tableName: 'Files'
    })
    
    return File
}