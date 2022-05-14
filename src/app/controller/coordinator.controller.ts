import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {Coordinator} from "../database/models";
import {CoordinatorService} from "../service/coordinator.service";

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

}