const { passport } = require('../middlewares/passport')
const bcrypt = require('bcrypt')
const db = require('../models')

module.exports.signup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    if (!email || !password || !password2) {
        res.json({ msg: 'not ok' })
    }

    if (password !== password2) {
        res.json({ msg: 'password not eq' })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = {
            email: email,
            salt: salt,
            password: hashedPassword
        }

        db.User.create(newUser)
            .then(() => {
                res.redirect('/')
            }).catch(function (error) {
                next(error)
            })
    }
}

module.exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure'
})

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}