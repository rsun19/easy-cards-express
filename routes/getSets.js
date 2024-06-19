import express from 'express';
import { authenticateToken } from '../jwt/jwt.js';
import prisma from '../lib/prisma.js'

var router = express.Router();

router.get('/', authenticateToken, async function(req, res, next) {
  const userId = req.user;
  const set = await prisma.user.findFirstOrThrow(
      {
        where: {
          id: userId
        },
        include: {
          sets: true
        }
      }
    )
  const responseMap = {
    username: set.name,
    sets: set.sets
  }
  res.status(200).send(JSON.stringify(responseMap));
});

export default router;
