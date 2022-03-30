const fs = require('fs')
const config = require('../config')

function filePath(filename) {
    return `${config.storage.filesPath}/${filename}`
}

function saveFile(filename, buffer) {
    fs.writeFileSync(filePath(filename), buffer)
}

function removeFile(filename) {
    const path = filePath(filename)

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(path)
    }
}

module.exports = {
    saveFile: saveFile,
    removeFile: removeFile,
    filePath: filePath
}