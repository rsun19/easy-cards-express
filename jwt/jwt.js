import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  // console.log(process.env.PRIVATE_KEY)
  return jwt.sign({ user: user }, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
}

export function generateRefreshToken(user) {
  return jwt.sign({ user: user }, process.env.PRIVATE_KEY, { expiresIn: '30d' });
}

export function decodeToken(token) {
  return jwt.decode(token);
}

export function authenticateRefreshToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user.user
    next()
  })
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user.user
    next()
  })
}