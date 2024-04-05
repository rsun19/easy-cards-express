import express from 'express';
var router = express.Router();
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport'
import { insertUser } from '../db/insertUser.js';
import { getRandomUsername } from '../lib/usernameGenerator.js'
import { getUserFromString } from '../db/getUserFromString.js'

/*
NEED EXPRESS SESSION
*/

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  },
  async function(accessToken, refreshToken, profile, cb) {
    const email = profile.emails[0].value;
    try {
        const user = await getUserFromString(email); 
    } catch (error) {
        console.log(error);
        let userName = await getRandomUsername(email);
        while (userName[1] == -1) {
            userName = await getRandomUsername(email);
        }
        const user = await insertUser(email, userName[0]);   
    }
    
    return cb(null, profile);
  }
));

router.get('/',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

export default router;
