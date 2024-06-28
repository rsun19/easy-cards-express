import prisma from "../../lib/prisma.js"

export async function updateUsername(id, username) {
    const insertAnswer = await prisma.user.update({
      where: { id },
      data: {
        name: username,
      },
    })
    return insertAnswer;
  }