const bodyParser = require('body-parser')

const json = bodyParser.json()
const urlencoded = bodyParser.urlencoded({ extended: false, limit: '2mb' })

module.exports = {
    json: json,
    urlencoded: urlencoded
}
