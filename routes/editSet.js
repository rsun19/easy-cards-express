import express from 'express';
var router = express.Router();
import { connectSetToUser, insertSet, updateSetName } from '../db/setOperations.js'
import { insertQuestion, updateQuestion } from '../db/questionOperations.js';
import { editAnswer, insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res, next) {
    const editSetInfo = req.body.edit;
    const newSetInfo = req.body.new;
    const { setInfo } = req.body
    var isError = false;
    try {
        editSetInfo.forEach(async (card) => {
            const question = card.question
            const answer = card.answer
            await updateQuestion({id: card.questionId, question: question})
            // for (let i = 0; i < answer.length; i++) {
            await editAnswer({ id: card.answerId, answer: answer[0] })
            // }
        })
    } catch (error) {
        res.status(403).send("Error updating entries");
    }
    try {
        const set = await updateSetName(setInfo.id, setInfo.name)
        newSetInfo.forEach(async (card) => {
            const question_arr = card.question;
            const answer_arr = card.answer;
            const answerIndexCorrect = card.answerIndex;
            const question = await insertQuestion({ question: question_arr, setId: setInfo.id });
            for (let i = 0; i < answer_arr.length; i++) {
                await insertAnswer({ name: answer_arr[i], questionId: question.id, isCorrect: answerIndexCorrect });
            }
        });
    } catch (error) {
        res.status(403).send("Error putting set in database");
        isError = true;
    }
    if (!isError) {
        res.status(200).send("Set created successfully");
    }
});

export default router;
