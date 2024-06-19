import prisma from '../lib/prisma.js'

export async function getAllUserSets (id) {
    const set = await prisma.user.findFirstOrThrow(
        {
            where: {
                id: id
            },
            include: {
                sets: true
            }
        }
    )
    return set
}