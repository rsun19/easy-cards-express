import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

function generateAccessToken(user) {
  return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
}

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}