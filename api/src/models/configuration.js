const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Configuration extends Model {
    }

    Configuration.init({
        data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT
        },
        showOtherSignatures: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Configuration',
        tableName: 'Configurations',
        timestamps: false
    })

    return Configuration
}