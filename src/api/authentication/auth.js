/* eslint-disable linebreak-style */
// Importaing package

import JWT from 'jsonwebtoken';
import createError from 'http-errors';

// Importing the app constants
import { SECRET } from '../../config/index.js';

export const signAccessToken = (user) =>
    new Promise((resolve, reject) => {
        const payload = { id: user._id, role: user.role };
        const secret = SECRET;
        const options = { 
            expiresIn: '1h',
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(createError.InternalServerError());
                return;
            }
            resolve(token);
        });
    });
