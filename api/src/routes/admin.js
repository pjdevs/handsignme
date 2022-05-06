const router = require('express').Router()
const admin = require('../controllers/admin')
const { isAdmin } = require('../middlewares/auth')

router
    .get('/user/all', isAdmin, admin.getUserList)
    .get('/file/all', isAdmin, admin.getDocList)
    .get('/user/find/:email', isAdmin, admin.findUser)
    .get('/file/find/:name', isAdmin, admin.findFile)
    .delete('/user/delete/:id', isAdmin, admin.deleteUser)
    .delete('/file/delete/:id', isAdmin, admin.deleteFile)

module.exports = router