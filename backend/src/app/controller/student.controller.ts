import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {StudentModel} from "../database/db.models";
import {StudentService} from "../service/student.service";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";

export class StudentController {

    static async sendMail(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        if (body.subject == null || body.to == null || body.htmlEmail == null) {
            next(new ResponseError(ResponseMessage.INVALID_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const token = req.get('Authorization') as string;
            const student = JwtService.verifyToken(token) as StudentModel;

            await StudentService.sendMail(student, body.subject, body.to, body.htmlEmail);

            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async getInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const student = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentService.getInformation(student);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const student = JwtService.verifyToken(token) as StudentModel;

            const data = await StudentService.getForms(student);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

}