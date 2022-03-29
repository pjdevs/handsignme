const path = require('path')
const base = path.normalize(__dirname + '/../../')

const filesPath = path.normalize(`${base}/${process.env.FILES_PATH || 'files'}`)
const thumbnailsPath = path.normalize(`${base}/${process.env.THUMBNAILS_PATH || 'thumbnails'}`)

module.exports = {
    development: {
        storage: {
            filesPath: filesPath,
            thumbnailsPath: thumbnailsPath
        },
        server: {
            host: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || '8000'
        },
        dev: {
            password: process.env.PASSWORD
        }
    },
    test: {
        storage: {
            filesPath: filesPath,
            thumbnailsPath: thumbnailsPath
        },
        server: {
            host: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || '8000'
        }
    },
    production: {
        storage: {
            filesPath: filesPath,
            thumbnailsPath: thumbnailsPath
        },
        server: {
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || '80'
        }
    }
}