import express from 'express';
var router = express.Router();
import { updateSetName, getSet, getSetByName } from '../db/setOperations.js'
import { insertQuestion, updateQuestion } from '../db/questionOperations.js';
import { editAnswer, insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const editQuestionInfo = req.body.editQuestion;
    const editAnswerInfo = req.body.editAnswer;
    const newSetInfo = req.body.new;
    const setInfo = req.body.set;
    const setUpdate = req.body.setUpdate

    const canAccessSet = await getSet(setInfo.id);
    if (canAccessSet.userId !== userId) {
        res.status(401).send("Unauthorized access");
        return;
    }
    if (setUpdate) {
        const taken = await getSetByName({ id: setInfo.id, name: setInfo.name, userId });
        if (!taken) {
            res.status(403).send("Set name taken");
            return;
        }
    }
    try {
        editQuestionInfo.forEach(async (card) => {
            const question = card.question;
            await updateQuestion({id: card.questionId, question: question}, userId);
        })
        editAnswerInfo.forEach(async (card) => {
            const answer = card.answer;
            await editAnswer({ id: card.answerId, answer: answer[0] }, userId);
        })
    } catch (error) {
        res.status(403).send("Error updating entries");
        return;
    }
    try {
        if (setUpdate) {
            await updateSetName(setInfo.id, setInfo.name, userId)
        }
        newSetInfo.forEach(async (card) => {
            const question_arr = card.question;
            const answer_arr = card.answer;
            const answerIndexCorrect = card.answerIndex;
            const question = await insertQuestion({ question: question_arr, setId: setInfo.id }, userId);
            for (let i = 0; i < answer_arr.length; i++) {
                await insertAnswer({ name: answer_arr[i], questionId: question.id, isCorrect: answerIndexCorrect }, userId);
            }
        });
    } catch (error) {
        res.status(403).send("Error putting set in database");
        return;
    }
    res.status(200).send("Set created successfully");
});

export default router;
