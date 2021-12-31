import jwt from 'jsonwebtoken';
import {User} from "../database/models";
import {Env} from "../../../env";

export class JwtService {

    static generateAccesToken(user: User) {
        return jwt.sign({
            identifier: user.identifier,
            email: user.email},
            Env.TOKEN_SECRET);
    }

    static verifyToken(token: string) {
        return jwt.verify(token, Env.TOKEN_SECRET);
    }

}