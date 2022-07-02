import {CoordinatorModel, FileModel, StudentModel} from "../database/db.models";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {ResponseError} from "../middleware/middleware";
import {StudentService} from "./student.service";
import {dbConnection} from "../database/connect";
import {UploadedFile} from "express-fileupload";

export class CoordinatorService {

    static async getFiles(id: number): Promise<FileModel[]> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: id,
            },
            relations: ['files'],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        return (existingCoordinator.files ?? []).map(item => {item.data = Buffer.from(''); return item});
    }

    static async uploadFile(coordinator: CoordinatorModel, uploadedFile: UploadedFile) {
        const filesRepo = dbConnection.getRepository(FileModel);
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        uploadedFile.name = uploadedFile.name.replace(' ', '_');

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ['files'],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const fileModel = FileModel.fromObject({
            name: uploadedFile.name,
            data: uploadedFile.data,
            mimeType: uploadedFile.mimetype,
        });

        await filesRepo.save(fileModel);

        existingCoordinator.files = existingCoordinator.files ?? [];
        existingCoordinator.files.push(fileModel);
        await coordinatorRepo.save(existingCoordinator);
    }

    static async downloadFile(coordinatorId: number, fileId: string): Promise<FileModel> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinatorId,
            },
            relations: ['files'],
        });

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const fileModel = (existingCoordinator.files ?? []).find(item => `${item.id}` === fileId);

        if (fileModel == null) {
            throw new ResponseError(ResponseMessage.FILE_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        return fileModel;
    }

    static async deleteFile(coordinator: CoordinatorModel, fileId: string): Promise<void> {
        const fileRepo = dbConnection.getRepository(FileModel);
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        const existingCoordinator = await coordinatorRepo.findOne({
            where: {
                id: coordinator.id,
            },
            relations: ['files'],
        })

        if (existingCoordinator == null) {
            throw new ResponseError(ResponseMessage.COORDINATOR_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const fileModel = (existingCoordinator.files ?? []).find(item => `${item.id}` === fileId);

        if (fileModel == null) {
            throw new ResponseError(ResponseMessage.FILE_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await fileRepo.remove(fileModel);
    }

    static async getCoordinatorStudents(coordinator: CoordinatorModel): Promise<StudentModel[]> {
        const studentsRepo = dbConnection.getRepository(StudentModel);

        return await studentsRepo.find({
            where: {
                coordinatorName: coordinator.name,
                coordinatorFunction: coordinator.function,
                isActive: true,
            }
        });
    }

    static async getCoordinatorStudentForms(coordinator: CoordinatorModel, studentIdentifier: string): Promise<any[]> {
        const studentsRepo = dbConnection.getRepository(StudentModel);

        const existingStudent = await studentsRepo.findOne({
            where: {
                identifier: studentIdentifier,
                coordinatorName: coordinator.name,
                coordinatorFunction: coordinator.function,
                isActive: true,
            },
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        return await StudentService.getForms(existingStudent);
    }

}