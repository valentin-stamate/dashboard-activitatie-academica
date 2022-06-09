import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {StudentController} from "../controller/student.controller";

export function registerStudentEndpoints(app: Express) {
    app.get(EndpointIdentifier.INFORMATION, Middleware.studentMiddleware, StudentController.getInformation);
    app.get(EndpointIdentifier.FORMS, Middleware.studentMiddleware, StudentController.getForms);
    app.post(EndpointIdentifier.STUDENT_EMAIL, Middleware.studentMiddleware, StudentController.sendMail);
}