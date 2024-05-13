import express from 'express';
var router = express.Router();
import { connectSetToUser, insertSet } from '../db/setOperations.js'
import { insertQuestion } from '../db/questionOperations.js';
import { insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.user;
    console.log(req.user)
    const setInfo = req.body.cards;
    var isError = false;
    try {
        const set = await insertSet({ name: req.body.title, user: userId })
        const answer_list = [];
        setInfo.forEach(async (card) => {
            const question_arr = card[0];
            const answer_arr = card[1];
            const answerIndexCorrect = card[2];
            const question = await insertQuestion({ question: question_arr, setId: set.id });
            for (let i = 0; i < answer_arr.length; ++i) {
                const answer = await insertAnswer({ name: answer_arr[i], questionId: question.id, isCorrect: answerIndexCorrect });
                answer_list.push(answer);
            }
        });
        await connectSetToUser(userId, set.id);
    } catch (error) {
        res.status(403).send("Error putting set in database");
        isError = true;
    }
    if (!isError) {
        res.status(200).send("Set created successfully");
    }
});

export default router;
