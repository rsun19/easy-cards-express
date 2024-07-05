import express from 'express';
var router = express.Router();
import { deleteSet } from '../db/setOperations.js'
import { authenticateToken } from '../jwt/jwt.js';

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.user;
    const id = req.body.set;
    try {
        await deleteSet(id, userId)
        res.status(200).send("Set deleted successfully");
    } catch (error) {
        res.status(403).send("Error deleting set");
    }
});

export default router;
