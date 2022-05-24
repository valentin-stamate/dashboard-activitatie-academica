import {NextFunction, Request, Response,} from "express";
import {AdminModel, CoordinatorModel, StudentModel} from "../database/sequelize";
import {JwtService} from "../services/jwt.service";
import {Admin, Coordinator, Student} from "../database/models";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";

export class Middleware {
    /** Middleware for unauthorized users. In this case every request can pass. */
    static async visitorMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** Middleware for authorized students. In order for the request to pass the user should exist. */
    static async studentMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        try {
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

            const student = row.toJSON() as Student;

            if (!student.isActive) {
                next(new ResponseError(ResponseMessage.INACTIVE_USER, StatusCode.FORBIDDEN));
                return;
            }

            res.setHeader('Content-Type', ContentType.JSON);
            next();
        } catch (err) {
            console.log(err);
        }
    }

    /** Middleware for coordinators users. */
    static async coordinatorMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        try {

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
        } catch (err) {
            console.log(err);
        }
    }

    /** Middleware for admin users. */
    static async adminMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        try {
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

            const row = await AdminModel.findOne({where: {
                    id: user.id,
                    username: user.username || 'none',
                }});

            if (row === null) {
                next(new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.IM_A_TEAPOT));
                return;
            }

            res.setHeader('Content-Type', ContentType.JSON);
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    /** The endpoints that handles all the exceptions thrown by the app */
    static errorHandler(err: ResponseError, req: Request<any>, res: Response, next: NextFunction) {
        let statusError = 500;

        if (err.status) {
            statusError = err.status;
        }

        console.log('----------------------------=============================================================================----------------------------');
        console.log(err);
        console.log('----------------------------=============================================================================----------------------------');
        res.setHeader('Content-Type', ContentType.TEXT);
        res.statusCode = statusError;
        res.end(err.message);
    }
}

export class ResponseError extends Error {
    constructor(public message: string, public status: number = 500) {
        super(message);
    }
}
