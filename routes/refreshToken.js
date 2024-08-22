import express from 'express';
import { generateAccessToken, authenticateRefreshToken, decodeToken } from '../jwt/jwt.js';
var router = express.Router();

router.get('/', authenticateRefreshToken, async (req, res) => {
    try {
        const token = generateAccessToken(req.user);
        const decodedToken = decodeToken(token);
        res.status(200).send(JSON.stringify({
            accessToken: token,
            accessTokenExpires: decodedToken.exp
        }));
    } catch (e) {
        res.status(301).send('Unauthorized');
    }
})

export default router;
