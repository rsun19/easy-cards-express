import express from 'express';
var router = express.Router();
import '../lib/passport.js'
import passport from 'passport';
import { generateTemporaryAccessToken } from '../jwt/jwt.js';

router.get('/', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        const token = generateTemporaryAccessToken(req.user.id)
        res.redirect(`http://localhost:3000/callback?token=${token}`);
});

export default router;
