const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/sequelize.json')[env]

// Init connection and db
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Get models
const User = require('./user')(sequelize)
const File = require('./file')(sequelize)

// Associations
File.User = File.belongsTo(User, { as: 'owner' })

// Export connection and models
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    File: File
}
