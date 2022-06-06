import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {CoordinatorController} from "../controller/coordinator.controller";
import {CoordinatorFormsController} from "../controller/coordinator.forms.controller";

export function registerCoordinatorEndpoints(app: Express) {
    app.get(EndpointIdentifier.COORDINATOR_STUDENTS, Middleware.coordinatorMiddleware, CoordinatorController.getCoordinatorStudents);
    app.get(`${EndpointIdentifier.COORDINATOR_STUDENT_FORMS}/:identifier`, Middleware.coordinatorMiddleware, CoordinatorController.getStudentForms);

    app.get(EndpointIdentifier.COORDINATOR_SCIENTIFIC_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.getCoordinatorScientificActivity);
    app.patch(EndpointIdentifier.COORDINATOR_SCIENTIFIC_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.updateCoordinatorScientificActivity);
    app.delete(EndpointIdentifier.COORDINATOR_SCIENTIFIC_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.deleteCoordinatorScientificActivity);

    app.get(EndpointIdentifier.COORDINATOR_REFERENTIAL_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.getCoordinatorReferentialActivity);
    app.patch(EndpointIdentifier.COORDINATOR_REFERENTIAL_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.updateCoordinatorReferentialActivity);
    app.delete(EndpointIdentifier.COORDINATOR_REFERENTIAL_ACTIVITY, Middleware.coordinatorMiddleware, CoordinatorFormsController.deleteCoordinatorReferentialActivity);

    app.get(EndpointIdentifier.COORDINATOR_FILE, Middleware.coordinatorMiddleware, CoordinatorController.getFiles);
    app.get(`${EndpointIdentifier.COORDINATOR_DOWNLOAD_FILE}/:id`, Middleware.coordinatorMiddleware, CoordinatorController.downloadFile);

    app.post(EndpointIdentifier.COORDINATOR_FILE, Middleware.coordinatorMiddleware, CoordinatorController.uploadFile);
    app.delete(`${EndpointIdentifier.COORDINATOR_FILE}/:id`, Middleware.coordinatorMiddleware, CoordinatorController.deleteFile);


}