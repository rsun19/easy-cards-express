import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import jwt from 'jsonwebtoken';

export function generateTemporaryAccessToken(user) {
  const obj = {
    email: user,
    type: 'temporary'
  }
  return jwt.sign(JSON.stringify(obj), process.env.PRIVATE_KEY, { expiresIn: '60s' });
}

export function generateAccessToken(user) {
  return jwt.sign({user: user}, process.env.PRIVATE_KEY, { expiresIn: '1800s' });
}

export function generateRefreshToken(user) {
  return jwt.sign({user: user}, process.env.PRIVATE_KEY, { expiresIn: '30d' });
}

export function authenticateTemporaryToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = JSON.parse(user);
    if (req.user.type !== 'temporary') {
      return res.sendStatus(403);
    }
    next();
  })
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}