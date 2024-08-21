import express from 'express';
var router = express.Router();
import { deleteQuestion } from '../db/questionOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const { id } = req.body;
    try {
        await deleteQuestion(id, userId);
        res.status(201).send("Successfully deleted card");
    } catch (error) {
        res.status(403).send("Error deleting card");
    }
});

export default router;
