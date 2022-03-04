const env = process.env.NODE_ENV || 'development' 
require('dotenv').config()
const config = require('./app')[env]

module.exports = config