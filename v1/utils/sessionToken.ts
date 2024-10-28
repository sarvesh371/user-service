import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN, SESSION_EXPIRATION } from '../config/index';


export async function generateAccessJWT(userId: string): Promise<string> {
    const payload = { id: userId };
    if (!SECRET_ACCESS_TOKEN) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined');
    }
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
        expiresIn: SESSION_EXPIRATION,
    });
  }
  