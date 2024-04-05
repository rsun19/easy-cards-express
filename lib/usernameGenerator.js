import { getUsername } from '../db/checkForUsername.js'
import { insertUser } from '../db/insertUser.js';

export async function getRandomUsername (email) {
    let username = 'user';
    for (let i = 0; i < 32; ++i) {
        username += Math.floor(Math.random() * 10).toString();
    }
    try {
        await getUsername(username);
        return ["error", -1];
    } catch (error) {
        await insertUser(email, username);
        return [username, 0];
    }
}