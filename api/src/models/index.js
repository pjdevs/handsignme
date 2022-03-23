const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/sequelize.json')[env]

// Init connection and db
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Get models
const User = require('./user')(sequelize)
const File = require('./file')(sequelize)
const Document = require('./document')(sequelize)
const Configuration = require('./configuration')(sequelize)

// Associations
File.User = File.belongsTo(User, { as: 'owner' })
File.Configuration = File.belongsToMany(Configuration, { through: Document })
Configuration.File = Configuration.belongsToMany(File, { through: Document })

// Export connection and models
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    File: File,
    Document: Document,
    Configuration: Configuration
}
