import express from 'express';
var router = express.Router();
import '../lib/passport.js'
import passport from 'passport';

router.get('/', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('http://localhost:3000/user');
});

export default router;
