import prisma from '../lib/prisma.js'
import { getUserFromID } from './getUser.js';

export async function getFlashcards (setId, userId) {
    const questions = await prisma.set.findFirstOrThrow(
        {
            where: {
                id: setId
            },
            include: {
                questions: true
            }
        }
    );
    const flashcards = {
        set: questions,
        flashcards: [],
        visit: questions.userId !== userId
    };
    const user = await getUserFromID(userId);
    if ((questions.userId !== userId && !questions.visit.includes(user.email)) && questions.public === false) {
        console.log('hit');
        throw new Error('You cannot access this set.')
    }
    for (let i = 0; i < questions.questions.length; i++) {
        const answers = await prisma.question.findFirstOrThrow(
            {
                where: {
                    id: questions.questions[i].id
                },
                include: {
                    answers: true
                }
            }
        );
        flashcards.flashcards.push({
            question: questions.questions[i],
            answers: answers.answers
        });
    }
    return flashcards;
}