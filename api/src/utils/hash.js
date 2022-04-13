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

function hashToken(user, signatory, document, number) {
    const hashToken = crypto.createHash('md5')

    return hashToken
        .update(user.id.toString())
        .update(user.email.toString())
        .update(signatory.id.toString())
        .update(signatory.email.toString())
        .update(document.id.toString())
        .update(number ? number.toString() : crypto.randomBytes(8).toString('hex'))
        .digest('hex')
}

module.exports = {
    hashFile: hashFile,
    hashToken: hashToken
}