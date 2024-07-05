import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getUserFromID } from '../db/getUser.js';

router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await getUserFromID(req.user);
    res.status(200).send(JSON.stringify(user.name))
  } catch (e) {
    res.status(403).send('No user found');
  }
})

export default router;
