import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {CoordinatorService} from "../service/coordinator.service";

export function registerCoordinatorEndpoints(app: Express) {
    app.get(EndpointIdentifier.COORDINATOR_STUDENTS, Middleware.coordinatorMiddleware, CoordinatorService.getCoordinatorStudents);
}