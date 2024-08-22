import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getSet, removeViewUserFromSet } from '../db/setOperations.js';
import { getUserFromEmail } from '../db/getUser.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const removedUserEmail = req.body.email;
    const setId = req.body.setId;
    try {
        const set = await getSet(Number(setId));
        if (set.userId === userId && set.visit.includes(removedUserEmail)) {
          const editedSetArray = set.visit.filter(item => item !== removedUserEmail);
          await removeViewUserFromSet(Number(setId), Number(userId), editedSetArray);
          res.status(200).send("Set deleted successfully");
        } else {
            res.status(404).send("Error removing user");
        }
    } catch (error) {
        res.status(403).send("Error removing user");
    }
});

export default router;
