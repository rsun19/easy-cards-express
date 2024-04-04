import prisma from '../lib/prisma'

export async function getUsername (username: string): Promise<any> {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          name: username
        }
      }
    )
    return user
  }