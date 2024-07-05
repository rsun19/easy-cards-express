import express from 'express';
import { generateAccessToken, generateRefreshToken, decodeToken } from '../jwt/jwt.js';
var router = express.Router();
import { insertUser } from '../db/insertUser.js';
import { getRandomUsername } from '../lib/usernameGenerator.js'
import { getUserFromEmail } from '../db/getUser.js'  
import { rateLimit } from 'express-rate-limit';

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 4,
    standardHeaders: true,
    legacyHeaders: false,
})

router.post('/', signupLimiter, async function(req, res, next) {
    const email = req.body.email
    let user;
    try {
        user = await getUserFromEmail(email); 
    } catch (error) {
        console.log(error);
        const userName = await getRandomUsername(email);
        user = await insertUser(email, userName);   
    }
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
    console.log(JSON.stringify(userInfo));
    res.status(200).send(JSON.stringify(userInfo));
});

export default router;
