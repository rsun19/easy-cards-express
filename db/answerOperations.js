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

export async function getAnswer(id) {
  const answerQuery = await prisma.answer.findFirstOrThrow({
    where: {
      id,
    }
  })
  return answerQuery;
}

export async function editAnswer(answerInfo, userId) {
  const answerQuery = await getAnswer(answerInfo.id);
  if (answerQuery.userId !== userId) {
    throw new Error('unauthorized');
  }
  const answer = await prisma.answer.update(
    {
      where: {
        id: answerInfo.id
      },
      data: {
        answer: answerInfo.answer
      }
    }
  );
  return answer;
}

export async function insertAnswer (answer, userId) {
  const answerCreate = await prisma.answer.create({
    data: {
      answer: answer.name,
      userId,
      isCorrect: answer.correct ?? false,
      question: {
        connect: { id: answer.questionId }
      }
    }
  })
  return answerCreate;
}

export async function connectAnswerToQuestion (questionId, answerId) {
  const insertAnswer = await prisma.question.update({
    where: { id: questionId },
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