const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const Model = require('./model/models.js');

require('dotenv').config();

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

  
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  

  passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const userData = {
      email: profileJson.email,
      // firstName: profileJson.given_name,
      // familyName: profileJson.family_name,
      password: ""
    }
    userExist = Model.User.findAll({
      where: {
        email: userData.email
      }
    });
    if(!userExist) {

    }
    return done(null, profile);
  }
));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })
}