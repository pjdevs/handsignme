var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
  }))

  router.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );

  router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/failure'
    })
  );


  router.get('/auth/failure', (req, res, next) => {
    res.send("<h1> Something went wrong </h1>")
  });

  router.get('/', function(req, res) {
    res.render('home')
  });

  router.get('/dashboard', isAuthenticated, function(req, res) {
    console.log(req.userData);
    res.render('dashboard');
  });

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  });

  return router;
}