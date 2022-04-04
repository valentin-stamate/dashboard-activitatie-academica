import jwt from 'jsonwebtoken';
import {User} from "../database/db.models";

require('dotenv').config();
const env = process.env as any;

export class JwtService {

    static generateAccessToken(user: User) {
        return jwt.sign({
                id: user.id,
                identifier: user.identifier,
                email: user.email,
                admin: user.admin,
            },
            env.TOKEN_SECRET);
    }

    static verifyToken(token: string) {
        try {
            return jwt.verify(token, env.TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

}