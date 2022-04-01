const router = require('express').Router()
const admin = require('../controllers/admin')
const { isAdmin } = require('../middlewares/auth')

router
    .get('/user/all', isAdmin, admin.getUserList)
    .get('/file/all', isAdmin, admin.getDocList)

module.exports = router