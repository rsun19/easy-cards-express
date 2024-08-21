import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getSet, removeViewUserFromSet } from '../db/setOperations.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const removedUserId = req.body.id;
    const setId = req.body.setId;
    try {
        const set = await getSet(setId);
        if (set.userId === userId && set.visit.includes(removedUserId)) {
          const editedSetArray = set.visit.filter(item => item !== removedUserId);
          await removeViewUserFromSet(setId, userId, editedSetArray);
          res.status(200).send("Set deleted successfully");
        }
        res.status(404).send("Error removing user");
    } catch (error) {
        res.status(403).send("Error removing user");
    }
});

export default router;
