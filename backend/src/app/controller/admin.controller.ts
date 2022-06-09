import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {UtilService} from "../services/util.service";
import {AdminService} from "../service/admin.service";
import {JwtService} from "../services/jwt.service";
import {AdminModel, CoordinatorModel} from "../database/db.models";
import {CoordinatorService} from "../service/coordinator.service";

export class AdminController {

    static async getCoordinatorFiles(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const files = await CoordinatorService.getFiles(id);
            res.end(JSON.stringify(files));
        } catch (err) {
            next(err);
        }
    }

    static async downloadCoordinatorFile(req: Request<any>, res: Response, next: NextFunction) {
        const fileId = req.params.fileId;
        const coordinatorId = req.params.coordinatorId;

        try {
            const fileModel = await CoordinatorService.downloadFile(coordinatorId, fileId);

            console.log(fileModel.name);

            res.setHeader('Content-disposition', 'attachment; filename=' + fileModel.name);
            res.setHeader('Content-type', fileModel.mimeType);
            res.end(fileModel.data);
        } catch (err) {
            next(err);
        }
    }

    static async allStudents(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await AdminService.allStudents();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }

    static async deleteStudent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await AdminService.deleteStudent(id);

            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async getAllowedStudents(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const data = await AdminService.getAllowedStudents();
            res.end(JSON.stringify(data));
        } catch (err) {
            next(err);
        }

    }

    static async importAllowedUsers(req: Request<any>, res: Response, next: NextFunction) {
        if (req.files == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = req.files.file as UploadedFile;

        if (file === undefined) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM));
            return;
        }

        try {
            const rowsCreated = await AdminService.importAllowedUsers(file);

            res.statusCode = StatusCode.CREATED;

            res.setHeader('Content-Type', ContentType.TEXT);
            res.end(`${rowsCreated}`);
        } catch (err) {
            next(err);
        }
    }

    static async deleteAllowedStudent(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            await AdminService.deleteAllowedStudent(id);
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async exportForms(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const fileBuffer: Buffer = await AdminService.exportForms();

            const fileName = `data_${UtilService.stringDate(new Date())}.zip`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', ContentType.ZIP);

            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async faz(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;
        const files = req.files;

        if (files == null || body.intervals == null || body.afterTableNote == null || body.month == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const intervals = JSON.parse(body.intervals);
        const timetableFile = files.timetable as UploadedFile;

        if (timetableFile == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (isNaN(parseInt(body.month))) {
            next(new ResponseError(ResponseMessage.INVALID_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const fileBuffer = await AdminService.faz(timetableFile, body.afterTableNote, parseInt(body.month), intervals);
            const fileName = `faz_${UtilService.stringDate(new Date())}.zip`;

            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', ContentType.ZIP);
            res.end(fileBuffer);
        } catch (err) {
            next(err);
        }
    }

    static async importCoordinators(req: Request<any>, res: Response, next: NextFunction) {
        const files = req.files;

        if (files == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        if (files.file == null) {
            next(new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST));
            return;
        }

        const file = files.file as UploadedFile;

        try {
            const rowsCreated = await AdminService.importCoordinators(file);

            res.setHeader('Content-Type', ContentType.TEXT);
            res.statusCode = StatusCode.CREATED;
            res.end(`${rowsCreated}`);
        } catch (err) {
            next(err);
        }
    }

    static async getCoordinators(req: Request<any>, res: Response, next: NextFunction) {
        try {
            const rows = await AdminService.getCoordinators();
            res.end(JSON.stringify(rows));
        } catch (err) {
            next(err);
        }
    }
    
}