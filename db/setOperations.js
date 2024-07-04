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

export async function updateSetName (id, name) {
  const setUpdateName = await prisma.set.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  })
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

export async function deleteSet(id) {
  await prisma.set.delete({
    where: {
      id
    }
  });
}
