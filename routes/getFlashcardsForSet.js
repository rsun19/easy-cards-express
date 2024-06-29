import express from 'express';
import { authenticateToken } from '../jwt/jwt.js';
import { getFlashcards } from '../db/getFlashcards.js';

var router = express.Router();

router.get('/:id', authenticateToken, async function(req, res, next) {
  const userId = req.user;
  const { id } = req.params;
  try {
    const flashcards = await getFlashcards(Number(id), userId)
    res.status(200).send(JSON.stringify(flashcards));
  } catch (e) {
    res.status(403).send(JSON.stringify('Error fetching flashcards'))
  }
});

export default router;
