import express from 'express';
var router = express.Router();

router.get('/', async function(req, res, next) {
    const set = await prisma.set.findFirstOrThrow(
        {
          where: {
            id
          }
        }
      )
      return user
});

export default router;
