// const { createHmac } = require('node:crypto');
// require('dotenv').config({ path: '.env.local' });

// export function encodeJWT(message) {
//     const secret = process.env.PRIVATE_KEY;
//     const hash = createHmac('sha256', secret)
//                    .update(message)
//                    .digest('hex');
//     return hash;
// }

// export function decodeJWT(message, incoming) {
//     const secret = proces.env.private_KEY;
//     const hash = createHmac('sha256', secret)
//                    .update(message)
//                    .digest('hex');
//     if (incoming === hash) {
//         return true;
//     }
//     return false;
// }