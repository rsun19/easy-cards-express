import prisma from '../lib/prisma.js'

export async function getUserFromString (email) {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          email
        }
      }
    )
    return user
}