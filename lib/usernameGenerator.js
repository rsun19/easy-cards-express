import { getUsername } from '../db/checkForUsername.js'
import { insertUser } from '../db/insertUser.js';

export async function findUsernameWrapper (username) {
    try {
        await getUsername(username);
        return 0;
    } catch (e) {
        return -1;
    }
}

function generateUsername () {
    let username = 'user';
    for (let i = 0; i < 32; ++i) {
        username += Math.floor(Math.random() * 10).toString();
    }
    return username;
}

export async function getRandomUsername () {
    let username = generateUsername();
    let status = await findUsernameWrapper(username);
    while (status === 0) {
        username = generateUsername();
        status = await findUsernameWrapper(username);
    }
    return username;
}
