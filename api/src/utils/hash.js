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

function nbrCaracteres(number) {
    let n = 0
    while (number !== 0) {
        number = Math.floor(number / 10)
        n++
    }
    return n
}

function hashToken(user, signatory, document) {
    const hashToken = crypto.createHash('md5')

    let hash = hashToken
        .update(user.id.toString())
        .update(user.email.toString())
        .update(signatory.id.toString())
        .update(signatory.email.toString())
        .update(document.id.toString())
        .digest('hex')
    let nDoc = nbrCaracteres(document.id)
    let nSign = nbrCaracteres(signatory.id)
    let hashUnicity = document.id.toString() + signatory.id.toString() + hash.slice(nDoc + nSign)
    return hashUnicity
}

module.exports = {
    hashFile: hashFile,
    hashToken: hashToken
}