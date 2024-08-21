import express from 'express';
import { authenticateToken } from '../jwt/jwt.js';
import { getSet } from '../db/setOperations.js';

var router = express.Router();

router.get('/:id', authenticateToken, async function(req, res) {
  const userId = req.user;
  const setId = req.params.id;
  try {
    const set = await getSet(setId);
    if (set.userId === userid || set.visit.contains(userId.toString())) {
        res.status(301).send(JSON.stringify('Unauthorized'));
    }
    const responseMap = {
      setName: set.name,
      questions: set.questions
    }
    res.status(200).send(JSON.stringify(responseMap));
  } catch (e) {
    res.status(404).send(JSON.stringify('Error fetching sets'));
  }
});

export default router;
