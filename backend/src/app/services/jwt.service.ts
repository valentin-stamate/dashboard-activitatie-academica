import jwt from 'jsonwebtoken';
import {Admin, Coordinator, Student} from "../database/models";
import {UserType} from "./user.type";

require('dotenv').config();
const env = process.env as any;

/** Creates the jwt for user
 * User types are:
 * 1 for Student
 * 2 for Coordinator
 * 3 for Admin */
export class JwtService {

    static generateAccessTokenForStudent(user: Student) {
        return jwt.sign({
                id: user.id,
                fullName: user.fullName,
                identifier: user.identifier,
                email: user.email,
                userType: UserType.STUDENT,
            },
            env.TOKEN_SECRET);
    }

    static generateAccessTokenForCoordinator(coordinator: Coordinator) {
        return jwt.sign({
            id: coordinator.id,
            name: coordinator.name,
            function: coordinator.function,
            email: coordinator.email,
            userType: UserType.COORDINATOR,
        }, env.TOKEN_SECRET);
    }

    static generateAccessTokenForAdmin(coordinator: Admin) {
        return jwt.sign({
            id: coordinator.id,
            username: coordinator.username,
            userType: UserType.ADMIN,
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