const router = require('express').Router()
const admin = require('../controllers/admin')

router
    .get('/user/all', admin.getUserList)
    .get('/file/all', admin.getDocList)


module.exports = router