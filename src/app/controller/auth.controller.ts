import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {JwtService} from "../services/jwt.service";
import {AuthService} from "../service/auth.service";

export class AuthController {
    /************************************************************************************
     *                               Visitor user only
     ***********************************************************************************/
    static async check(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;

        if (token === undefined) {
            next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const user = JwtService.verifyToken(token) as any;
            await AuthService.check(user);

            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async signupStudent(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const identifier = body.identifier;
        const email = body.email;
        const alternativeEmail = body.alternativeEmail;

        if (!identifier || !email || !alternativeEmail) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            await AuthService.signupStudent(identifier, email, alternativeEmail);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async loginStudent(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const identifier = body.identifier;
        const email = body.email;

        if (!identifier || !email) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
        }

        try {
            await AuthService.loginStudent(identifier, email);

            res.contentType(ContentType.TEXT);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async loginStudentWithCode(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const identifier = body.identifier;
        const email = body.email;
        const code = body.code;

        if (!identifier || !email || !code) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
        }

        try {
            const token = await AuthService.loginStudentWithCode(identifier, email, code);

            res.contentType(ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

    static async loginCoordinator(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
        }

        try {
            const token = await AuthService.loginCoordinator(email, password);

            res.contentType(ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

    static async loginAdmin(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const username = body.username;
        const email = body.email;

        if (!username || !email) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
        }

        try {
            await AuthService.loginAdmin(username, email);

            res.contentType(ContentType.TEXT);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async loginAdminWithCode(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const username = body.username;
        const email = body.email;
        const code = body.code;

        if (!username || !email || !code) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
        }

        try {
            const token = await AuthService.loginAdminWithCode(username, email, code);

            res.contentType(ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

}