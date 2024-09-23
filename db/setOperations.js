import prisma from '../lib/prisma.js'

export async function getSetsFromUserId(id) {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        id
      },
      include: {
        sets: true
      },
    }
  )
  return user
} 

export async function getSetByName(setInfo) {
  try {
    const set = await prisma.set.findFirstOrThrow({
      where: {
        name: setInfo.name,
        userId: setInfo.userId
      }
    });
    if (typeof setInfo.id === 'undefined') {
      return false;
    }
    if (set.id === setInfo.id) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export async function insertSet (setInfo) {
  if (!(await getSetByName(setInfo))) {
    throw new Error("name taken");
  }
  const setCreate = await prisma.set.create({
    data: {
      name: setInfo.name,
      user: {
        connect: { id: setInfo.userId }
      }
    }
  })
  return setCreate;
}

export async function updateSetName (id, name, userId) {
  const findSet = await getSet(id);
  if (findSet.userId !== userId) {
    throw new Error('unauthorized')
  }
  if (!(await getSetByName({ id, name, userId }))) {
    throw new Error("name taken");
  }
  const setUpdateName = await prisma.set.update({
    where: {
      id,
    },
    data: {
      name: name
    }
  })
  return setUpdateName;
}

export async function connectSetToUser (userId, setId) {
  const insertSets = await prisma.user.update({
    where: { id: userId },
    data: {
      sets: {
        connect:{
          id: setId
        },
      },
    },
    include: { sets: true }
  })
  return insertSets;
}

export async function getSet(id) {
  const findQuestion = await prisma.set.findFirstOrThrow(
    {
      where: {
        id
      },
      include: {
        questions: true,
      },
    }
  )
  return findQuestion;
}

export async function deleteSet(id, userId) {
  const findSet = await getSet(id);
  if (findSet.userId !== userId) {
    throw new Error('unauthorized')
  }
  await prisma.set.delete({
    where: {
      id
    }
  });
}

export async function addUserToViewSet(addedUserId, setId, currentUser) {
  await prisma.set.update({
    where: {
      id: setId,
      userId: currentUser
    },
    data: {
      visit: {
        push: addedUserId
      }
    }
  });
}

export async function removeViewUserFromSet(setId, currentUser, editedSetArray) {
  await prisma.set.update({
    where: {
      id: setId,
      userId: currentUser
    },
    data: {
      visit: editedSetArray
    }
  });
}