const path = require('path')
const base = path.normalize(__dirname + '/../..')

module.exports = (db, config) => {
    return {
        getPdfList: async (req, res) => {
            const pdfList = await db.File.findAll({
                attributes: ['id', 'name']
            })

            res.json(pdfList.map(file => file.dataValues))
        },
        getPdfThumbnailById: async (req, res) => {
            const pdf = await db.File.findByPk(req.params.id)
            const file = `${pdf.file}.thumb.png`

            res.download(`${base}/${config.storage.thumbnailsPath}/${file}`, file)
        },
        getPdfById: async (req, res) => {
            const pdf = await db.File.findByPk(req.params.id)

            res.download(`${base}/${config.storage.filesPath}/${pdf.file}`, pdf.file)
        }
    }
}