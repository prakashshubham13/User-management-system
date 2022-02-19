// Importaing package
import JWT from 'jsonwebtoken';
import createError from 'http-errors';

// Importing the app constants
import { SECRET } from '../../config/index.js';

// Verify Token
export const verifyAccessToken= (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })
  }

//  Verify Admin
export const adminVerification= (req, res, next) => {
  req.payload.role === "admin" ? next():next(createError.Unauthorized());
  return;
}

// Verify Active User
export const userVerification= (req, res, next) => {
 ( req.payload.id === req.params.userId)||(req.payload.role==="admin") ? next():next(createError.Unauthorized());
  return;
}