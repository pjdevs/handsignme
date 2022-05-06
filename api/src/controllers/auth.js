const bcrypt = require('bcrypt')
const db = require('../models')

module.exports.signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    if (!email || !password || !password2) {
        return next(new Error('Wrong credentials'))
    }

    if (password !== password2) {
        next(new Error('Passwords do not match'))
    } else {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = {
            email: email,
            salt: salt,
            password: hashedPassword
        }

        try {
            await db.User.create(newUser)
            res.json({ msg: 'success' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports.login = (req, res, next) => {
    req.login(req.user, (err) => {
        if (err) {
            err.status = 401
            next(err)
        } else {
            res.json({ msg: 'success' })
        }
    })
}

module.exports.logout = (req, res) => {
    req.logout()
    res.json({ msg: 'success' })
}