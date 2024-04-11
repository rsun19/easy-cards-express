import express from 'express';
var router = express.Router();
import '../lib/passport.js'
import passport from 'passport';

router.get('/',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

export default router;
