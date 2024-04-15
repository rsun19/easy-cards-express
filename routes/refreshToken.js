import express from 'express';
import { generateAccessToken } from '../jwt/jwt.js';
var router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const token = generateAccessToken(req.user);
    return token;
})

export default router;
