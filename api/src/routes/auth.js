const router = require('express').Router()
const auth = require('../controllers/auth')
const { isAuthenticated } = require('../middlewares/auth')
const passport = require('../middlewares/passport')

router
    .post('/login', passport.authenticate(), auth.login)
    .post('/signup', auth.signup)
    .post('/logout', auth.logout)
    .post('/check', isAuthenticated, (req, res) => res.json({ msg: 'ok' }))

module.exports = router