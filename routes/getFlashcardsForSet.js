import express from 'express';
import { authenticateToken } from '../jwt/jwt.js';
import { getFlashcards } from '../db/getFlashcards.js';

var router = express.Router();

router.get('/', authenticateToken, async function(req, res, next) {
  const userId = req.user;
  const id = req.params.id;
  try {
    const flashcards = await getFlashcards(id, userId)
    res.status(200).send(JSON.stringify(flashcards));
  } catch (e) {
    res.status(404).send(JSON.stringify('Error fetching flashcards'))
  }
});

export default router;
