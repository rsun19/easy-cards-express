import prisma from '../lib/prisma.js'

export async function getUsername (username) {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          name: username
        }
      }
    )
    return user
}