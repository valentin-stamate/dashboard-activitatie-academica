import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {CoordinatorController} from "../controller/coordinator.controller";

export function registerCoordinatorEndpoints(app: Express) {
    app.get(EndpointIdentifier.COORDINATOR_STUDENTS, Middleware.coordinatorMiddleware, CoordinatorController.getCoordinatorStudents);
    app.get(`${EndpointIdentifier.COORDINATOR_STUDENT_FORMS}/:identifier`, Middleware.coordinatorMiddleware, CoordinatorController.getStudentForms);
}