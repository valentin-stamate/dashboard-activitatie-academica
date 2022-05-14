import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {Student} from "../database/models";
import {UserService} from "../service/user.service";

export class UserController {

    static async getInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await UserService.getInformation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as Student;

            const data = await UserService.getForms(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

}