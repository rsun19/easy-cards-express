import prisma from '../lib/prisma.js'

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
    if (questions.userId !== userId && questions.public === 'false') {
        throw new Error('You cannot access this set.')
    }
    const flashcards = {
        set: questions,
        flashcards: []
    };
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