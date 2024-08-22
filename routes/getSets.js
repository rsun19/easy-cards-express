import express from 'express';
import { authenticateToken } from '../jwt/jwt.js';
import { getAllUserSets } from '../db/getAllUserSets.js';

var router = express.Router();

router.get('/', authenticateToken, async function(req, res) {
  const userId = req.user;
  try {
    const set = await getAllUserSets(userId)
    const responseMap = {
      username: set.name,
      sets: set.sets
    }
    res.status(200).send(JSON.stringify(responseMap));
  } catch (e) {
    res.status(404).send(JSON.stringify('Error fetching sets'))
  }
});

export default router;
