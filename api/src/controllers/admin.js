const db = require('../models')

async function getUserList(req, res) {
    const userList = await db.User.findAll({
        attributes: ['id', 'email']
    })

    res.json(userList.map(user => user.dataValues))
}

async function getDocList(req, res) {
    const docList = await db.Document.findAll({
        attributes: ['id', 'name', 'ownerId']
    })

    res.json(docList.map(doc => doc.dataValues))
}

module.exports = {
    getUserList,
    getDocList
}