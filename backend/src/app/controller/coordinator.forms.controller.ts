import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {Coordinator} from "../database/models";
import {CoordinatorFormsService} from "../service/coordinator.forms.service";
import {CoordinatorReferentialActivity, CoordinatorScientificActivity} from "../database/form.models";

export class CoordinatorFormsController {

    /** Activitatea științifică a conducatorului de doctorat */
    static async getCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;

            const data = await CoordinatorFormsService.getCoordinatorScientificActivity(coordinator);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async updateCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;
            const body = req.body as CoordinatorScientificActivity;

            await CoordinatorFormsService.updateCoordinatorScientificActivity(coordinator, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;

            await CoordinatorFormsService.deleteCoordinatorScientificActivity(coordinator);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    /** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC */
    static async getCoordinatorReferentialActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;

            const data = await CoordinatorFormsService.getCoordinatorReferentialActivity(coordinator);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async updateCoordinatorReferentialActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;
            const body = req.body as CoordinatorReferentialActivity;

            await CoordinatorFormsService.updateCoordinatorReferentialActivity(coordinator, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCoordinatorReferentialActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as Coordinator;

            await CoordinatorFormsService.deleteCoordinatorReferentialActivity(coordinator);
            res.end();
        } catch (err) {
            next(err);
        }
    }

}