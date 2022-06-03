import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {StudentModel} from "../database/db.models";
import {StudentService} from "../service/student.service";

export class StudentController {

    static async getInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentService.getInformation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentService.getForms(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

}