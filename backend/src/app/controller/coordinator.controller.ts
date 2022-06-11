import {NextFunction, Request, Response} from "express";
import {JwtService} from "../services/jwt.service";
import {CoordinatorModel} from "../database/db.models";
import {CoordinatorService} from "../service/coordinator.service";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {ResponseError} from "../middleware/middleware";
import {UploadedFile} from "express-fileupload";

export class CoordinatorController {

    static async getFiles(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;

        try {
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            const files = await CoordinatorService.getFiles(coordinator.id);
            res.end(JSON.stringify(files));
        } catch (err) {
            next(err);
        }
    }

    static async uploadFile(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;
        const files = req.files;

        if (files == null) {
            next(new ResponseError(ResponseMessage.FILES_NOT_FOUND, StatusCode.NOT_FOUND));
            return;
        }

        const file = files.file as UploadedFile;

        if (file == null) {
            next(new ResponseError(ResponseMessage.FILE_NOT_FOUND, StatusCode.NOT_FOUND));
            return;
        }

        try {
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            await CoordinatorService.uploadFile(coordinator, file);

            res.statusCode = StatusCode.CREATED;
            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async downloadFile(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;
        const fileId = req.params.id;

        try {
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            const fileModel = await CoordinatorService.downloadFile(coordinator.id, fileId);

            console.log(fileModel.name);

            res.setHeader('Content-disposition', 'attachment; filename=' + fileModel.name);
            res.setHeader('Content-type', fileModel.mimeType);

            console.log(fileModel.data);

            res.end(fileModel.data);
        } catch (err) {
            next(err);
        }
    }

    static async deleteFile(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;
        const fileId = req.params.id;

        try {
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            await CoordinatorService.deleteFile(coordinator, fileId);

            res.end();
        } catch (err) {
            next(err);
        }
    }

    static async getCoordinatorStudents(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get('Authorization') as string;

        try {
            const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

            const students = await CoordinatorService.getCoordinatorStudents(coordinator);
            res.end(JSON.stringify(students));
        } catch (err) {
            next(err);
        }
    }

    static async getStudentForms(req: Request<any>, res: Response, next: NextFunction) {
        const studentIdentifier = req.params.identifier;
        const token = req.get('Authorization') as string;
        const coordinator = JwtService.verifyToken(token) as CoordinatorModel;

        try {
            const forms: any[] = await CoordinatorService.getCoordinatorStudentForms(coordinator, studentIdentifier);

            res.contentType(ContentType.JSON);
            res.end(JSON.stringify(forms));
        } catch (err) {
            next(err);
        }
    }

}