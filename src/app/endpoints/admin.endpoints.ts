import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {AdminController} from "../controller/admin.controller";

export function registerAdminEndpoints(app: Express) {
    app.get(EndpointIdentifier.USER, Middleware.adminMiddleware, AdminController.allUsers);
    app.delete(`${EndpointIdentifier.USER}/:id`, Middleware.adminMiddleware, AdminController.deleteUser);

    app.get(EndpointIdentifier.BASE_INFORMATION, Middleware.adminMiddleware, AdminController.getBaseInformation);
    app.post(EndpointIdentifier.BASE_INFORMATION, Middleware.adminMiddleware, AdminController.importBaseInformation);
    app.delete(`${EndpointIdentifier.BASE_INFORMATION}/:id`, Middleware.adminMiddleware, AdminController.deleteBaseInformation);

    app.post(EndpointIdentifier.SEMESTER_ACTIVITY_EMAIL, Middleware.adminMiddleware, AdminController.sendSemesterActivityEmail);
    app.post(EndpointIdentifier.FAZ, Middleware.adminMiddleware, AdminController.faz);
    app.post(EndpointIdentifier.VERBAL_PROCESS, Middleware.adminMiddleware, AdminController.sendVerbalProcess);
    app.post(EndpointIdentifier.THESIS_NOTIFICATION, Middleware.adminMiddleware, AdminController.sendThesisEmailNotification);
    app.get(EndpointIdentifier.EXPORT_FORMS, Middleware.adminMiddleware, AdminController.exportForms);
    app.post(EndpointIdentifier.IMPORT_COORDINATORS, Middleware.adminMiddleware, AdminController.importCoordinators);
    app.get(EndpointIdentifier.COORDINATORS, Middleware.adminMiddleware, AdminController.getCoordinators);
}