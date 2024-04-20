import express from 'express';
import { generateAccessToken, authenticateRefreshToken } from '../jwt/jwt.js';
var router = express.Router();

router.get('/', authenticateRefreshToken, async (req, res) => {
    const token = generateAccessToken(req.user);
    const cookie = req.body.cookie;
    const cookieData = JSON.parse(req.body.cookie);
    cookieData['accessToken'] = token;
    console.log(JSON.stringify(userInfo));
    res.status(200).send(JSON.stringify(cookieData));
})

export default router;
