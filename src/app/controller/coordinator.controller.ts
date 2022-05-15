import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {Coordinator} from "../database/models";
import {CoordinatorService} from "../service/coordinator.service";
import {ContentType} from "../services/rest.util";

export class CoordinatorController {

    static async getCoordinatorStudents(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;

        try {
            const coordinator = JwtService.verifyToken(token) as Coordinator;

            const students = await CoordinatorService.getCoordinatorStudents(coordinator);
            res.end(JSON.stringify(students));
        } catch (err) {
            next(err);
        }
    }

    static async getStudentForms(req: Request<any>, res: Response, next: NextFunction) {
        const studentIdentifier = req.params.identifier;
        const token = req.get('Authorization') as string;
        const coordinator = JwtService.verifyToken(token) as Coordinator;

        try {
            const forms: any[] = await CoordinatorService.getCoordinatorStudentForms(coordinator, studentIdentifier);

            res.contentType(ContentType.JSON);
            res.end(JSON.stringify(forms));
        } catch (err) {
            next(err);
        }
    }

}