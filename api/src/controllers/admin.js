const db = require('../models')
const { removeFile } = require('../utils/file-storage')

async function getUserList(req, res) {
    const userList = await db.User.findAll({
        attributes: ['id', 'email']
    })

    res.json(userList.map(user => user.dataValues))
}

async function getDocList(req, res, next) {
    const docList = await db.Document.findAll({
        attributes: ['id', 'name', 'ownerId']
    })

    res.json(docList.map(doc => doc.dataValues))
}

async function deleteFile(req, res) {
    const doc = await db.Document.findByPk(req.params.id)

    if(!doc) {
        return next(new Error(`Cannot find a Document with id ${req.params.id}`))
    }

    const signatories = await db.Signatory.findAll({
        where: {
            documentId: req.params.id
        }
    })
    await Promise.all(signatories.map(async signatory => {
        await signatory.destroy()
    }))

    const config = await db.Configuration.findByPk(doc.configurationId)
    try {
        removeFile(doc.filename)
    } catch (err) {
        return next(new Error(`Cannot remove the file : ${err.message}`))
    }
    await doc.destroy()
    await config.destroy()

    res.json({
        msg: 'Document deleted'
    })
}

async function deleteUser(req, res, next) {
    const user = await db.User.findByPk(req.params.id)

    if(!user) {
        return next(new Error(`Cannot find a User with id ${req.params.id}`))
    }

    const documents = await db.Document.findAll({
        where: {
            ownerId: req.params.id
        }
    })

    await Promise.all(documents.map(async doc => {
        const signatories = await db.Signatory.findAll({
            where: {
                documentId: doc.id
            }
        })
        await Promise.all(signatories.map(async signatory => {
            await signatory.destroy()
        }))

        const config = await db.Configuration.findByPk(doc.configurationId)
        try {
            removeFile(doc.filename)
        } catch (err) {
            return next(new Error(`Cannot remove the file : ${err.message}`))
        }
        await doc.destroy()
        await config.destroy()
    }))

    await user.destroy()

    res.json({
        msg: 'User deleted'
    })

}

module.exports = {
    getUserList,
    getDocList,
    deleteFile,
    deleteUser
}