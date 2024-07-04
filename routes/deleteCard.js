import express from 'express';
var router = express.Router();
import { updateSetName } from '../db/setOperations.js'
import { deleteQuestion } from '../db/questionOperations.js';
import { editAnswer, insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.user
    const { id } = req.body;
    try {
        await deleteQuestion(id);
        res.status(201).send("Successfully deleted card");
    } catch (error) {
        console.log('first')
        console.log(error)
        res.status(403).send("Error deleting card");
    }
});

export default router;
