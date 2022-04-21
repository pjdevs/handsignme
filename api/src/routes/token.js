const router = require('express').Router()
const { isSignatory } = require('../middlewares/auth')
const token = require('../controllers/token')

router
    .post('/token/validate', isSignatory, token.validateEmail)

module.exports = router