import prisma from '../lib/prisma.js'

export async function insertUser (email, username) {
    const userDB = await prisma.user.create({
      data: {
        email,
        name: username
      }
    })
    const user = {
      id: userDB.id,
      email: userDB.email,
      name: userDB.name,
    }
    return user
}