const gm = require('gm').subClass({ imageMagick: true })
const fs = require('fs')
const config = require('../config')

async function ensureThumbnail(filename) {
    const filePath = `${config.storage.filesPath}/${filename}`
    const thumbnailPath = `${config.storage.thumbnailsPath}/${filename}.thumb.png`

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(thumbnailPath)) {
            gm(`${filePath}[0]`)
                .setFormat('png')
                .resize(200)
                .quality(100)
                .write(thumbnailPath, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(thumbnailPath)
                    }
                })
        }

        resolve(thumbnailPath)
    })
}

module.exports = {
    ensureThumbnail: ensureThumbnail
}