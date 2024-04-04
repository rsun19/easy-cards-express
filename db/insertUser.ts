import prisma from '../lib/prisma'
import { type Profile } from './database-interfaces'

export async function insertUser (email: string, username: string): Promise<Profile> {
    const userDB = await prisma.user.create({
      data: {
        email,
        name: username
      }
    })
    const user: Profile = {
      id: userDB.id,
      email: userDB.email,
      name: userDB.name,
      sets: null
    }
    return user
}