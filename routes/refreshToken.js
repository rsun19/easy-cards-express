import express from 'express';
import { generateAccessToken, authenticateRefreshToken, decodeToken } from '../jwt/jwt.js';
var router = express.Router();

router.get('/', authenticateRefreshToken, async (req, res) => {
    const token = generateAccessToken(req.user);
    // const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
    const decodedToken = decodeToken(token);
    res.status(200).send(JSON.stringify({
        accessToken: token,
        accessTokenExpires: decodedToken.exp
    }));
})

export default router;
