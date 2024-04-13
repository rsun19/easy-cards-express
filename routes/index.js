import express from 'express';
import { generateAccessToken } from '../jwt/jwt.js'
var router = express.Router();

router.get('/', function(req, res, next) {
  
  const token = generateAccessToken();
  res.send(token.json());
});

export default router;
