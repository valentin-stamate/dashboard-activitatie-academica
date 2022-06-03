import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {CoordinatorModel} from "../database/db.models";
import {CoordinatorFormsService} from "../service/coordinator.forms.service";
import {
    CoordinatorReferentialActivityModel,
    CoordinatorScientificActivityModel
} from "../database/forms/db.coordinator.forms";

export class CoordinatorFormsController {

    /** Activitatea științifică a conducatorului de doctorat */
    static async getCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            const data = await CoordinatorFormsService.getCoordinatorScientificActivity(coordinator);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async updateCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;
            const body = req.body as CoordinatorScientificActivityModel;

            await CoordinatorFormsService.updateCoordinatorScientificActivity(coordinator, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCoordinatorScientificActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

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
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            const data = await CoordinatorFormsService.getCoordinatorReferentialActivity(coordinator);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async updateCoordinatorReferentialActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;
            const body = req.body as CoordinatorReferentialActivityModel;

            await CoordinatorFormsService.updateCoordinatorReferentialActivity(coordinator, body);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteCoordinatorReferentialActivity(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            await CoordinatorFormsService.deleteCoordinatorReferentialActivity(coordinator);
            res.end();
        } catch (err) {
            next(err);
        }
    }

}