import prisma from '../lib/prisma.js'
import { getUserFromID } from './getUser.js'

export async function getSetsFromUserId(id) {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        id
      },
      include: {
        sets: true
      },
    }
  )
  return user
} 

export async function insertSet (setInfo) {
  const setCreate = await prisma.set.create({
    data: {
      name: setInfo.name,
      user: {
        connect: { id: setInfo.user }
      }
    }
  })
  return setCreate;
}

export async function updateSetName (id, name, userId) {
  const findSet = await getSet(id);
  if (findSet.userId !== userId) {
    throw new Error('unauthorized')
  }
  const setUpdateName = await prisma.set.update({
    where: {
      id,
    },
    data: {
      name: name
    }
  })
  return setUpdateName;
}

export async function connectSetToUser (userId, setId) {
  const insertSets = await prisma.user.update({
    where: { id: userId },
    data: {
      sets: {
        connect:{
          id: setId
        },
      },
    },
    include: { sets: true }
  })
  return insertSets;
}

export async function getSet(id) {
  const findQuestion = await prisma.set.findFirstOrThrow(
    {
      where: {
        id
      }
    }
  )
  return findQuestion;
}

export async function deleteSet(id, userId) {
  const findSet = await getSet(id);
  if (findSet.userId !== userId) {
    throw new Error('unauthorized')
  }
  await prisma.set.delete({
    where: {
      id
    }
  });
}
