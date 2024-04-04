import prisma from '../lib/prisma'

export async function getUser (email: string): Promise<any> {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          email
        }
      }
    )
    return user
}