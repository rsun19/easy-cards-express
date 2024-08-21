import express from 'express';
import { generateAccessToken, generateRefreshToken, decodeToken } from '../jwt/jwt.js';
var router = express.Router();
import { insertUser } from '../db/insertUser.js';
import { getRandomUsername } from '../lib/usernameGenerator.js'
import { getUserFromEmail } from '../db/getUser.js'  
import { rateLimit } from 'express-rate-limit';

const refreshLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 2,
    standardHeaders: true,
    legacyHeaders: false,
})

router.post('/', refreshLimiter, async function(req, res) {
    const email = req.body.email
    let user;
    try {
        user = await getUserFromEmail(email); 
    } catch (error) {
        const userName = await getRandomUsername(email);
        user = await insertUser(email, userName);   
    }
    try {
        const accessToken = generateAccessToken(user.id);
        const decodedAccessToken = decodeToken(accessToken);
        const refreshToken = generateRefreshToken(user.id);
        const decodedRefreshToken = decodeToken(refreshToken);
        const userInfo = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            accessTokenExpires: decodedAccessToken.exp,
            refreshTokenExpires: decodedRefreshToken.exp
        };
        res.status(200).send(JSON.stringify(userInfo));
    } catch (e) {
        res.status(404).send('Failed to create user');
    }
});

export default router;
