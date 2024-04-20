import express from 'express';
var router = express.Router();
import { getUserFromID } from '../db/getUser.js'
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
    const set_req = JSON.parse(req.body.set);
    const question_req = JSON.parse(req.body.question);
    const answers_req = JSON.parse(req.body.answers);
    try {
        const answer_list = [];
        for (let i = 0; i < answers_req.length; ++i) {
            const answer = await insertAnswer(answers_req[i]);
            answer_list.push(answer);
        }
        question = await insertQuestion(question_req);
        set = await insertSet(set_req);
        await connectAllAnswers(answer_list, question.id);
        await connectQuestionToSet(set.id, question.id);
        await connectSetToUser(userId, set.id);
    } catch (error) {
        res.status(403).send("Error putting set in database")
    }
    res.status(200).send("Set created successfully");
});

export default router;
