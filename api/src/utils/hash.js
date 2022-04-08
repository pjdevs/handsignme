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
    try {
        const userId = user.id
        const userMail = user.mail
        const signatoryId = signatory.id
        const signatoryMail = signatory.mail
        const documentId = document.id

        const hashToken = crypto.createHash('md5')

        return hashToken
            .update(userId.toString())
            .update(userMail.toString())
            .update(signatoryId.toString())
            .update(signatoryMail.toString())
            .update(documentId.toString())
            .update(number === undefined ? crypto.randomBytes(100).toString() : number.toString())
            .digest('hex')
    } catch (err) {
        return err.toString()
    }
}

module.exports = {
    hashFile: hashFile,
    hashToken: hashToken
}