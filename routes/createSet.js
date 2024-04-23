import express from 'express';
var router = express.Router();
import { connectSetToUser, insertSet } from '../db/setOperations.js'
import { connectQuestionToSet, insertQuestion } from '../db/questionOperations.js';
import { connectAnswerToQuestion, insertAnswer } from '../db/answerOperations.js';

async function connectAllAnswers(questionId, answer_list) {
    for (let i = 0; i < answer_list.length; ++i) {
        await connectAnswerToQuestion(questionId, answer_list[i].id);
    }
}

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.body.user;
    const setInfo = JSON.parse(req.body.setMap);
    try {
        const answer_list = [];
        setInfo.cards.forEach(async (card) => {
            question_arr = card[0]
            answer_arr = card[1]
            for (let i = 0; i < answer_arr.length; ++i) {
                const answer = await insertAnswer({name: answer_arr[i]});
                answer_list.push(answer);
            }
            question = await insertQuestion({name: question_arr});
            await connectAllAnswers(answer_list, question.id);
            await connectQuestionToSet(set.id, question.id);
        });
        await connectSetToUser(userId, set.id);
    } catch (error) {
        res.status(403).send("Error putting set in database")
    }
    res.status(200).send("Set created successfully");
});

export default router;
