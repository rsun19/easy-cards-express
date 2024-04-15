import express from 'express';
var router = express.Router();
import { getUserFromID } from '../db/getUser.js'  

router.post('/', authenticateToken, async function(req, res, next) {
    const userId = req.body.user;
    let user;
    try {
        const user = await getUserFromID(userId);
    } catch (error) {
        res.status(403).send("Error finding user in database");
    }
    try {

    } catch (error) {
        res.status(403).send("Error putting set in database")
    }
    res.status(201).send("Set created successfully");
});

export default router;
