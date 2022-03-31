const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Model = require('../models/models.js');


module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    (username, password, done) => {
      Model.User.findOne({
        where: {
          'username': username
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }
        
        const hashedPassword = bcrypt.hashSync(password, user.salt)
        
        if (user.password === hashedPassword) {
          return done(null, user)
        }
        
        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })
}