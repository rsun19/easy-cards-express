import prisma from "../../lib/prisma.js"

export async function getUserFromUsername(username) {
    const user = await prisma.user.findFirstOrThrow(
      {
        where: {
          name: username
        }
      }
    )
    return user
  }