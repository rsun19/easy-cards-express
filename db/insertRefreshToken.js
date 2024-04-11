import prisma from '../lib/prisma.js'

export async function updateRefreshToken (id, refreshToken) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      refreshToken: refreshToken
    }
  })
  return user
}