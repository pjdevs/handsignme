const fs = require('fs')
const crypto = require('crypto')
const config = require('../config')

function hashFile(filename) {
    try {
        const buffer = fs.readFileSync(`${config.storage.filesPath}/${filename}`)
        const md5Hasher = crypto.createHash('md5')

        return md5Hasher.update(buffer).digest('hex')
    } catch (err) {
        return ''
    }
}

module.exports = {
    hashFile: hashFile
}