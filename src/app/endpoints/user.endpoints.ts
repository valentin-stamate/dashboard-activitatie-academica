import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {UserController} from "../controller/user.controller";

export function registerUserEndpoints(app: Express) {
    app.get(EndpointIdentifier.INFORMATION, Middleware.studentMiddleware, UserController.getInformation);
    app.get(EndpointIdentifier.FORMS, Middleware.studentMiddleware, UserController.getForms);
}