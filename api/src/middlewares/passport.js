const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
(email, password, done) => {
    console.log(email, password)
    db.User.findOne({
        where: {
            email: email
        }
    }).then(function (user) {
        if (user === null) {
            return done(null, false, { message: 'Incorrect credentials.' })
        }

        const hashedPassword = bcrypt.hashSync(password, user.salt)

        if (user.password === hashedPassword) {
            return done(null, user)
        }

        return done(null, false, { message: 'Incorrect credentials.' })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    db.User.findByPk(id)
        .then(user => {
            done(null, user.dataValues)
        })
        .catch(err => {
            done(err, null)
        })
})

module.exports = {
    initialize: () => passport.initialize(),
    session: () => passport.session(),
    authenticate: () => passport.authenticate('local')
}