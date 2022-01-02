import jwt from 'jsonwebtoken';
import {User} from "../database/models";
import {Env} from "../../../env";

export class JwtService {

    static generateAccesToken(user: User) {
        return jwt.sign({
            id: user.id,
            identifier: user.identifier,
            email: user.email},
            Env.TOKEN_SECRET);
    }

    static verifyToken(token: string) {
        try {
            return jwt.verify(token, Env.TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

}