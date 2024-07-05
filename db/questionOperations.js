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
  return user;
} 

export async function getQuestion (id) {
  const getQuestion = await prisma.question.findFirstOrThrow(
    {
      where: {
        id
      }
    }
  )
  return getQuestion;
}

export async function deleteQuestion (id, userId) {
  const findQuestion = await getQuestion(id);
  if (findQuestion.userId !== userId) {
    throw new Error('User is not authorized...')
  }
  const deleteQuestion = await prisma.question.delete({
    where: {
      id
    }
  })
  return deleteQuestion;
}

export async function insertQuestion (question, userId) {
  const questionCreate = await prisma.question.create({
    data: {
      question: question.question,
      userId,
      set: {
        connect: { id: question.setId }
      }
    }
  })
  return questionCreate;
}

export async function updateQuestion (questionInfo, userId) {
  const findQuestion = await getQuestion(questionInfo.id);
  if (findQuestion.userId !== userId) {
    throw new Error('User is not authorized...')
  }
  const updateQuestion = await prisma.question.update({
    where: {
      id: questionInfo.id
    },
    data: {
      question: questionInfo.question
    }
  })
  return updateQuestion;
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