import {NextFunction, Request, Response} from "express";
import {ResponseMessage, RestService, StatusCode} from "./rest.service";
import {UploadedFile} from "express-fileupload";
import {ResponseError} from "./rest.middlewares";

/** The lowest layer that have access to req & res
 * It uses RestService to handle logic stuff */
export class RestController {

    /************************************************************************************
     *                               Visitor user only
     ***********************************************************************************/
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

    /************************************************************************************
     *                               Admin only
     ***********************************************************************************/
    static async allUsers(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await RestService.allUsers();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async importBaseInformation(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files === undefined) {
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

    static async sendOrganizationEmail(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const email = req.body.email;
        const subject = req.body.subject;
        const from = req.body.from;
        const file = req.files.file as UploadedFile;

        if (email === undefined || subject === undefined || from === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const data = await RestService.sendOrganizationEmail(email, from, subject, file);
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }

    }
}