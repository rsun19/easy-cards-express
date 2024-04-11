import prisma from '../lib/prisma.js'

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