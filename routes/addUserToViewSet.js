import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { addUserToViewSet } from '../db/setOperations.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const addedUserId = req.body.id;
    const setId = req.body.setId;
    try {
        await addUserToViewSet(addedUserId, setId, userId);
        res.status(200).send("Set deleted successfully");
    } catch (error) {
        res.status(403).send("Error adding user");
    }
});

export default router;
