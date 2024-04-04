var express = require('express');
var router = express.Router();
require('dotenv').config({ path: '.env.local' });
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

module.exports = router;
