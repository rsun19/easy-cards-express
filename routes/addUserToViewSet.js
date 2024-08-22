import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { addUserToViewSet } from '../db/setOperations.js';
import { getSet } from '../db/setOperations.js';
import { getUserFromEmail } from '../db/getUser.js';

router.post('/', authenticateToken, async function(req, res) {
    const userId = req.user;
    const addedUserEmail = req.body.email;
    const setId = req.body.setId;
    try {
        const set = await getSet(Number(setId));
        const user = await getUserFromEmail(req.body.email);
        if (set.visit.includes(addedUserEmail)) {
            res.status(404).send("user already added");
        } else if (user.id === userId) {
            res.status(401).send("Cannot add yourself");
        } else {
            await addUserToViewSet(addedUserEmail, Number(setId), Number(userId));
            res.status(200).send("Added user successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("Error adding user");
    }
});

export default router;
