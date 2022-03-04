const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class File extends Model {
    }

    File.init({
        file: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'File',
        tableName: 'Files',
        timestamps: false
    })
    
    return File
}