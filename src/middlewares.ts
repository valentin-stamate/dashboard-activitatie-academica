import {NextFunction, Request, Response,} from "express";

export function unknownUserRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    next();
}

export function userRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    next();
}

export function adminUserRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    next();
}