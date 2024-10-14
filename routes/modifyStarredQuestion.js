import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { updateQuestionStar } from '../db/questionOperations.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    console.log(req.body);
    const question = req.body;    
    try {
       await updateQuestionStar(question, userId);
       res.status(200).send("Question star succesfully updated");
    } catch (e) {
        res.status(404).send("Error...");
    }
});

export default router;
