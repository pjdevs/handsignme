const fs = require('fs')
const crypto = require('crypto')
const config = require('../config')

function hashFile(filename) {
    const buffer = fs.readFileSync(`${config.storage.filesPath}/${filename}`)

    const md5Hasher = crypto.createHash('md5')
    const hash = md5Hasher.update(buffer).digest('hex')

    return hash
}

module.exports = {
    hashFile: hashFile
}