import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getSet } from '../db/setOperations.js';

router.get('/:id', authenticateToken, async function(req, res) {
    const userId = req.user;
    const setId = req.params.id;
    try {
        const set = await getSet(Number(setId));
        if (set.userId === userId) {
          res.status(200).send(JSON.stringify(set.visit));
        } else {
            res.status(404).send("Error removing user");
        }
    } catch (error) {
        res.status(403).send("Error removing user");
    }
});

export default router;
