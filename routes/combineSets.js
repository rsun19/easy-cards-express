import express from 'express';
var router = express.Router();
import { insertSet, getSetByName, checkSetByName } from '../db/setOperations.js'
import { insertQuestion } from '../db/questionOperations.js';
import { insertAnswer } from '../db/answerOperations.js';
import { authenticateToken } from '../jwt/jwt.js';
import { getFlashcards } from '../db/getFlashcards.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const startingSet = req.body.starting;
    const setName = req.body.setName;
    const setList = req.body.setList;
    const allSets = [];
    try {
        if (!(await checkSetByName({ name: setName, userId }))) {
            res.status(403).send("name taken");
            return;
        }
        const flashcards = await getFlashcards(startingSet, userId);
        allSets.push(flashcards.flashcards);
        setList.forEach(async (set) => {
            const setResponse = await getSetByName(set, userId);
            const flashcards = await getFlashcards(setResponse.id, userId)
            allSets.push(flashcards.flashcards);
        });
        const set = await insertSet({ name: setName, userId: userId });
        allSets.forEach(async (flashcardsArr) => {
            flashcardsArr.forEach(async (flashcards) => {
                const question = await insertQuestion({ question: flashcards.question.question, setId: set.id }, userId);
                for (let i = 0; i < flashcards.answers.length; i++) {
                    await insertAnswer({ name: flashcards.answers[i].answer, questionId: question.id, isCorrect: flashcards.answers[i].isCorrect }, userId);
                }
            })
        });
        res.status(200).send("Set created successfully");
    } catch (error) {
        if (error.message === 'name taken') {
            res.status(403).send("Set name taken");
        } else {
            res.status(403).send("Error putting set in database");
        }
    }
});

export default router;
