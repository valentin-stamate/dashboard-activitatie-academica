import {NextFunction, Request, Response,} from "express";
import {JwtService} from "../services/jwt.service";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {AdminModel, CoordinatorModel, StudentModel} from "../database/db.models";
import {dbConnection} from "../database/connect";

export class Middleware {
    /** Middleware for unauthorized users. In this case every request can pass. */
    static async visitorMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        res.setHeader('Content-Type', ContentType.JSON);
        next();
    }

    /** Middleware for authorized students. In order for the request to pass the user should exist. */
    static async studentMiddleware (req: Request<any>, res: Response, next: NextFunction) {
        const studentRepo = dbConnection.getRepository(StudentModel);

        try {
            const token = req.get('Authorization');

            if (token == null) {
                next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
                return;
            }

            const student = JwtService.verifyToken(token) as StudentModel;

            if (student === null) {
                next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
                return;
            }

            const existingStudent = await studentRepo.findOne({
                where: {
                    id: student.id,
                    fullName: student.fullName ?? '',
                    identifier: student.identifier ?? '',
                    email: student.email ?? '',
                }
            });

            if (existingStudent == null) {
                next(new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.IM_A_TEAPOT));
                return;
            }

            if (!existingStudent.isActive) {
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
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        try {

            const token = req.get('Authorization');

            if (token == null) {
                next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
                return;
            }

            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            if (coordinator == null) {
                next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
                return;
            }

            const existingCoordinator = await coordinatorRepo.findOne({
                where: {
                    id: coordinator.id,
                    name: coordinator.name ?? '',
                    function: coordinator.function ?? '',
                    email: coordinator.email ?? '',
                }
            });

            if (existingCoordinator == null) {
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
        const adminRepo = dbConnection.getRepository(AdminModel);

        try {
            const token = req.get('Authorization');

            if (token == null) {
                next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
                return;
            }

            const admin = JwtService.verifyToken(token) as AdminModel;

            if (admin == null) {
                next(new ResponseError(ResponseMessage.INVALID_TOKEN, StatusCode.IM_A_TEAPOT));
                return;
            }

            const existingAdmin = await adminRepo.findOne({
                where: {
                    id: admin.id,
                    username: admin.username ?? '',
                }
            });

            if (existingAdmin == null) {
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
