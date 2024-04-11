import prisma from '../lib/prisma.js'

export async function getUserFromID (id) {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        id
      }
    }
  )
  return user
}

export async function getUserFromEmail (email) {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          email
        }
      }
    )
    return user
}