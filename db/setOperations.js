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

export async function insertSet (set) {
  const setCreate = await prisma.set.create({
    data: {
      name: set.name,
      user: {
        connect: { id: set.user }
      }
    }
  })
  return setCreate;
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