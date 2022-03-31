const router = require('express').Router()
const auth = require('../controllers/auth')
const passport = require('../middlewares/passport')

router
    .post('/login', passport.authenticate(), auth.login)
    .post('/signup', auth.signup)
    .post('/logout', auth.logout)

module.exports = router