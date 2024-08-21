import express from 'express';
var router = express.Router();
import { insertSet } from '../db/setOperations.js'
import { insertQuestion } from '../db/questionOperations.js';
import { insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const setInfo = req.body.cards;
    try {
        const set = await insertSet({ name: req.body.title, user: userId })
        const answer_list = [];
        setInfo.forEach(async (card) => {
            const question_arr = card[0];
            const answer_arr = card[1];
            const answerIndexCorrect = card[2];
            const question = await insertQuestion({ question: question_arr, setId: set.id }, userId);
            for (let i = 0; i < answer_arr.length; ++i) {
                const answer = await insertAnswer({ name: answer_arr[i], questionId: question.id, isCorrect: answerIndexCorrect }, userId);
                answer_list.push(answer);
            }
        });
        res.status(200).send("Set created successfully");
    } catch (error) {
        console.log(error);
        res.status(403).send("Error putting set in database");
    }
});

export default router;
