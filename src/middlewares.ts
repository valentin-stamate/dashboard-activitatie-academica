import {NextFunction, Request, Response,} from "express";
import {Responses} from "./app/service/service.response";
import {UserRepository} from "./app/database/repository/user.repository";
import {JwtService} from "./app/service/jwt.service";
import {GraphQlErrorResponse, User} from "./app/database/models";

/** Middleware for unauthorized users. In this case every request can pass. */
export async function unknownUserRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    next();
}

/** Middleware for authorized users. In order for the request to pass the user should exist. */
export async function userRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).end(JSON.stringify(new GraphQlErrorResponse([Responses.UNAUTHORIZED])));
        return;
    }

    const decoded = JwtService.verifyToken(token) as User;

    if (!decoded) {
        res.status(406).end(JSON.stringify(new GraphQlErrorResponse([Responses.INVALID_TOKEN])));
        return;
    }

    const user = await UserRepository.getUserByEmail(decoded.email);

    if (!user) {
        res.status(404).end(JSON.stringify(new GraphQlErrorResponse([Responses.NOT_FOUND])));
        return;
    }

    if (!user.activated) {
        res.status(401).end(JSON.stringify(new GraphQlErrorResponse([Responses.UNAUTHORIZED_ACTIVATE_FIRST])));
        return;
    }

    next();
}

/** Middleware for admin users. */
export async function adminUserRequestMiddleware (req: Request<any>, res: Response<any>, next: NextFunction) {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).end(JSON.stringify(new GraphQlErrorResponse([Responses.UNAUTHORIZED])));
        return;
    }

    const decoded = JwtService.verifyToken(token) as User;

    if (!decoded) {
        res.status(406).end(JSON.stringify(new GraphQlErrorResponse([Responses.INVALID_TOKEN])));
        return;
    }

    const user = await UserRepository.getUserByEmail(decoded.email);

    if (!user) {
        res.status(404).end(JSON.stringify(new GraphQlErrorResponse([Responses.NOT_FOUND])));
        return;
    }

    if (!user.activated) {
        res.status(401).end(JSON.stringify(new GraphQlErrorResponse([Responses.UNAUTHORIZED_ACTIVATE_FIRST])));
        return;
    }

    if (!user.admin) {
        res.status(401).end(JSON.stringify(new GraphQlErrorResponse([Responses.UNAUTHORIZED_ONLY_ADMIN])));
        return;
    }

    next();
}