import {Express} from "express";
import {EndpointIdentifier} from "../../endpoint.identifier";
import {Middleware} from "../middleware/middleware";
import {AdminController} from "../controller/admin.controller";
import {AdminEmailController} from "../controller/admin.email.controller";

export function registerAdminEndpoints(app: Express) {
    /* Students */
    app.get(EndpointIdentifier.STUDENT, Middleware.adminMiddleware, AdminController.allStudents);
    app.delete(`${EndpointIdentifier.STUDENT}/:id`, Middleware.adminMiddleware, AdminController.deleteStudent);

    app.get(EndpointIdentifier.ALLOWED_STUDENTS, Middleware.adminMiddleware, AdminController.getAllowedStudents);
    app.post(EndpointIdentifier.ALLOWED_STUDENTS, Middleware.adminMiddleware, AdminController.importAllowedUsers);
    app.delete(`${EndpointIdentifier.ALLOWED_STUDENTS}/:id`, Middleware.adminMiddleware, AdminController.deleteAllowedStudent);

    app.post(EndpointIdentifier.FAZ, Middleware.adminMiddleware, AdminController.faz);

    /* Email endpoints */
    app.post(EndpointIdentifier.SEMESTER_ACTIVITY_EMAIL, Middleware.adminMiddleware, AdminEmailController.sendSemesterActivityEmail);
    app.post(EndpointIdentifier.VERBAL_PROCESS, Middleware.adminMiddleware, AdminEmailController.sendVerbalProcess);
    app.post(EndpointIdentifier.THESIS_NOTIFICATION, Middleware.adminMiddleware, AdminEmailController.sendThesisEmailNotification);

    /* Export */
    app.get(EndpointIdentifier.EXPORT_FORMS, Middleware.adminMiddleware, AdminController.exportForms);

    /* Coordinators */
    app.post(EndpointIdentifier.IMPORT_COORDINATORS, Middleware.adminMiddleware, AdminController.importCoordinators);
    app.get(EndpointIdentifier.COORDINATORS, Middleware.adminMiddleware, AdminController.getCoordinators);
    app.get(`${EndpointIdentifier.ADMIN_COORDINATOR_FILES}/:id`, Middleware.adminMiddleware, AdminController.getCoordinatorFiles);
    app.get(`${EndpointIdentifier.ADMIN_DOWNLOAD_COORDINATOR_FILES}/:coordinatorId/:fileId`, Middleware.adminMiddleware, AdminController.downloadCoordinatorFile);

}