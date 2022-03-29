const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/sequelize.json')[env]

// Init connection and db
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Get models
const User = require('./user')(sequelize)
const Signatory = require('./signatory')(sequelize)
const Document = require('./document')(sequelize)
const Configuration = require('./configuration')(sequelize)

// Associations
Document.User = Document.belongsTo(User, { as: 'owner' })
Document.Configuration = Document.belongsTo(Configuration, { as: 'configuration' })
Signatory.Document = Signatory.belongsTo(Document, { as: 'document' })

// Export connection and models
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    Signatory: Signatory,
    Document: Document,
    Configuration: Configuration
}
