import express from 'express';
import { generateAccessToken, generateRefreshToken } from '../jwt/jwt.js';
var router = express.Router();
import { insertUser } from '../db/insertUser.js';
import { getRandomUsername } from '../lib/usernameGenerator.js'
import { getUserFromEmail } from '../db/getUser.js'  

router.post('/', async function(req, res, next) {
    const email = req.body.email
    let user;
    try {
        user = await getUserFromEmail(email); 
    } catch (error) {
        console.log(error);
        const userName = await getRandomUsername(email);
        user = await insertUser(email, userName);   
    }
    const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
        sets: user.sets,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpires: unixTimestampInSeconds + 1800,
        refreshTokenExpires: unixTimestampInSeconds + 2592000
    };
    console.log(JSON.stringify(userInfo));
    res.send(JSON.stringify(userInfo));
});

export default router;