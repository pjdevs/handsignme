const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/sequelize.json')[env]

// Init connection and db
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Get models
const User = require('./models/user')(sequelize)
const File = require('./models/file')(sequelize)

// Associations
File.User = File.belongsTo(User, { as: 'owner' })
// User.File = User.hasMany(File, { as: 'files' })

// Export connection and models
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    File: File
}
