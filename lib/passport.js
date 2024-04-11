import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport'
import { insertUser } from '../db/insertUser.js';
import { getRandomUsername } from '../lib/usernameGenerator.js'
import { getUserFromEmail } from '../db/getUserFromString.js'  

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  },
  async function(accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    var user;
    try {
        user = await getUserFromEmail(email); 
    } catch (error) {
        console.log(error);
        const userName = await getRandomUsername(email);
        user = await insertUser(email, userName);   
    }
    const userProfile = {
        id: user.id,
        email: user.email,
        name: user.name,
        sets: user.sets
    }
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});