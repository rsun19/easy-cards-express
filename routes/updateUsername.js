import express from 'express';
var router = express.Router();
import { authenticateToken } from '../jwt/jwt.js';
import { getUserFromUsername } from '../db/usernames/checkForUsername.js';
import { updateUsername } from '../db/usernames/updateUsername.js';

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.user;
    const username = req.body.username;
    console.log(username)
    try {
       await getUserFromUsername(username)
       res.status(403).send("Username is already taken");
    } catch (error) {
       try {
        await updateUsername(userId, username)
        res.status(200).send("Username successfully updated");
       } catch(e) {
        res.sendStatus(404);
       }
    }
});

export default router;
