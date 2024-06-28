import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getUserFromID } from '../db/getUser.js';

router.get('/', authenticateToken, async (req, res) => {
  const user = await getUserFromID(req.user);
  res.status(200).send(JSON.stringify(user.name))
})

export default router;
