import prisma from '../lib/prisma.js'
import { getUserFromID } from './getUser.js'

export async function getAnswersFromQuestionId(id) {
  const user = await prisma.question.findFirstOrThrow(
    {
      where: {
        id
      },
      include: {
        answers: true
      },
    }
  )
  return user
} 

export async function insertAnswer (answer) {
  const answerCreate = await prisma.answer.create({
    data: {
      answer: answer.name,
      isCorrect: answer.correct,
    }
  })
  return answerCreate;
}

export async function connectAnswerToQuestion (questionId, answerId) {
  const insertAnswer = await prisma.question.update({
    where: { questionId },
    data: {
      answers: {
        connect:{
          id: answerId
        },
      },
    },
  })
  return insertAnswer;
}