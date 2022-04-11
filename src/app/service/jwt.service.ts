import jwt from 'jsonwebtoken';
import {Admin, Coordinator, Student} from "../database/db.models";

require('dotenv').config();
const env = process.env as any;

export class JwtService {

    static generateAccessTokenForStudent(user: Student) {
        return jwt.sign({
                id: user.id,
                fullName: user.fullName,
                identifier: user.identifier,
                email: user.email,
            },
            env.TOKEN_SECRET);
    }

    static generateAccessTokenForCoordinator(coordinator: Coordinator) {
        return jwt.sign({
            id: coordinator.id,
            name: coordinator.name,
            function: coordinator.function,
            email: coordinator.email,
        }, env.TOKEN_SECRET);
    }

    static generateAccessTokenForAdmin(coordinator: Admin) {
        return jwt.sign({
            id: coordinator.id,
            username: coordinator.username,
        }, env.TOKEN_SECRET);
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, env.TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

}