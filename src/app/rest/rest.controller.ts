import {NextFunction, Request, Response} from "express";
import {ResponseMessage, RestService, StatusCode} from "./rest.service";
import {UploadedFile} from "express-fileupload";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {ScientificArticleISI, User} from "../database/models";

/** The lowest layer that have access to req & res
 * It uses RestService to handle logic stuff */
export class RestController {
    /************************************************************************************
     *                               Visitor user only
     ***********************************************************************************/
    static async check(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.check(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async signup(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.signup(req.body);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async login(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.login(req.body);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async authenticate(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.authenticate(req.body);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    /************************************************************************************
     *                               User only
     ***********************************************************************************/
    static async getInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getInformation(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getForms(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.getScientificArticleISI(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async addScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleISI;

            const data = await RestService.addScientificArticleISI(user, body);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async updateScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const body = req.body as ScientificArticleISI;

            const data = await RestService.updateScientificArticleISI(user, body);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async deleteScientificArticleISI(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;
            const id = req.params.id;

            const data = await RestService.deleteScientificArticleISI(user, id);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    /************************************************************************************
     *                               Admin only
     ***********************************************************************************/
    static async allUsers(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const token = req.get('Authorization') as string;
            const user = JwtService.verifyToken(token) as User;

            const data = await RestService.allUsers(user);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const data = await RestService.deleteUser(id);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async getBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.getBaseInformation();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }

    }

    static async importBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        if (!req.files) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = req.files.file as UploadedFile;

        try {
            const data = await RestService.importBaseInformation(file);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async deleteBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const data = await RestService.deleteBaseInformation(id);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async sendOrganizationEmail(req: Request<any>, res: Response, next: NextFunction) {
        if (!req.files) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const emailTemplate = req.body.emailTemplate;
        const subject = req.body.subject;
        const from = req.body.from;
        const file = req.files.file as UploadedFile;

        if (emailTemplate === undefined || subject === undefined || from === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const data = await RestService.sendOrganizationEmail(emailTemplate, from, subject, file);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }

    }
}