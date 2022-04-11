import {NextFunction, Request, Response,} from "express";
import {CoordinatorModel, StudentModel} from "../database/sequelize";
import {JwtService} from "../service/jwt.service";
import {Admin, Coordinator, Student} from "../database/db.models";
import {ContentType, ResponseMessage, StatusCode} from "./rest.util";

export class Middleware {
    /** Middleware for unauthorized users. In this case every request can pass. */
    static async visitorMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** Middleware for authorized students. In order for the request to pass the user should exist. */
    static async studentMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization');

        if (!token) {
            next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
            return;
        }

        const user = JwtService.verifyToken(token) as Student;

        if (user === null) {
            next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
            return;
        }

        const row = await StudentModel.findOne({where: {
                id: user.id,
                fullName: user.fullName || 'none',
                identifier: user.identifier || 'none',
                email: user.email || 'none',
            }});

        if (row === null) {
            next(new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.IM_A_TEAPOT));
            return;
        }

        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** Middleware for coordinators users. */
    static async coordinatorMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization');

        if (!token) {
            next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
            return;
        }

        const user = JwtService.verifyToken(token) as Coordinator;

        if (user === null) {
            next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
            return;
        }

        const row = await CoordinatorModel.findOne({where: {
                id: user.id,
                name: user.name || 'none',
                function: user.function || 'none',
                email: user.email || 'none',
            }});

        if (row === null) {
            next(new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.IM_A_TEAPOT));
            return;
        }

        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** Middleware for admin users. */
    static async adminMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization');

        if (!token) {
            next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
            return;
        }

        const user = JwtService.verifyToken(token) as Admin;

        if (user === null) {
            next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
            return;
        }

        const row = await StudentModel.findOne({where: {
                id: user.id,
                username: user.username || 'none',
            }});

        if (row === null) {
            next(new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.IM_A_TEAPOT));
            return;
        }

        if (!row.toJSON().admin) {
            next(new ResponseError(ResponseMessage.ADMIN_ONLY, StatusCode.IM_A_TEAPOT));
            return;
        }

        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** The middleware that handles all the exceptions thrown by the app */
    static errorHandler(err: ResponseError, req: Request<any>, res: Response, next: NextFunction) {
        let statusError = 500;

        if (err.status !== undefined) {
            statusError = err.status;
        }

        console.log(err);
        res.setHeader('Content-Type', ContentType.TEXT);
        res.status(statusError).send(err.message);
    }
}

export class ResponseError extends Error {
    constructor(public message: string, public status: number = 500) {
        super(message);
    }
}
