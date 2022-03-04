module.exports = {
    development: {
        storage: {
            filesPath: process.env.FILES_PATH || 'files',
            thumbnailsPath: process.env.THUMBNAILS_PATH || 'thumbnails'
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
        server: {
            host: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || '8000'
        }
    },
    production: {
        storage: {
            filesPath: process.env.FILES_PATH || 'files',
            thumbnailsPath: process.env.THUMBNAILS_PATH || 'thumbnails'
        },
        server: {
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || '80'
        }
    }
}