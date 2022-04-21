const router = require('express').Router()
const admin = require('../controllers/admin')
const { isAdmin } = require('../middlewares/auth')

router
    .get('/user/all', isAdmin, admin.getUserList)
    .get('/file/all', isAdmin, admin.getDocList)
    .delete('/user/delete/:id', isAdmin, admin.deleteUser)
    .delete('/file/delete/:id', isAdmin, admin.deleteFile)

module.exports = router