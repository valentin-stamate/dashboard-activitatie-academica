import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {AuthController} from "../controller/auth.controller";

export function registerAuthEndpoints(app: Express) {
    /** Check the user */
    app.get(EndpointIdentifier.CHECK, AuthController.check);

    app.post(EndpointIdentifier.SIGNUP_STUDENT, Middleware.visitorMiddleware, AuthController.signupStudent);
    app.post(EndpointIdentifier.LOGIN_STUDENT, Middleware.visitorMiddleware, AuthController.loginStudent);
    app.post(EndpointIdentifier.LOGIN_STUDENT_CODE, Middleware.visitorMiddleware, AuthController.loginStudentWithCode);

    app.post(EndpointIdentifier.LOGIN_COORDINATOR, Middleware.visitorMiddleware, AuthController.loginCoordinator);

    app.post(EndpointIdentifier.LOGIN_ADMIN, Middleware.visitorMiddleware, AuthController.loginAdmin);
    app.post(EndpointIdentifier.LOGIN_ADMIN_CODE, Middleware.visitorMiddleware, AuthController.loginAdminWithCode);
}