import prisma from '../lib/prisma.js'
import { getUserFromID } from './getUser.js'

export async function getQuestionsFromSetId(id) {
  const user = await prisma.set.findFirstOrThrow(
    {
      where: {
        id
      },
      include: {
        questions: true
      },
    }
  )
  return user
} 

export async function insertQuestion (question) {
  const questionCreate = await prisma.question.create({
    data: {
      question: question.question,
      set: {
        connect: { id: question.setId }
      }
    }
  })
  return questionCreate;
}

export async function connectQuestionToSet (setId, questionId) {
  const insertQuestion = await prisma.question.update({
    where: { id: setId },
    data: {
      questions: {
        connect:{
          id: questionId
        },
      },
    },
  })
  return insertQuestion;
}