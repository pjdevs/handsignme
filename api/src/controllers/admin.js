const fs = require('fs')
const config = require('../config')
const db = require('../models')

async function getUserList(req, res) {
    const userList = await db.User.findAll()
    
    res.json({ status: true, message: 'Returning users', userList })
}

async function getDocList(req, res) {
    const docList = await db.Document.findAll()
    
    res.json({ status: true, message: 'Returning documents', docList })
}

module.exports = {
    getUserList,
    getDocList
}