import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getUserFromID } from '../db/getUser.js';

router.get('/', authenticateToken, async (req, res) => {
  const user = await getUserFromID(req.user);
  res.json({ id: user.id, email: user.email, name: user.name })
})

export default router;
