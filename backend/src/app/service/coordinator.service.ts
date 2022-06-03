import {CoordinatorModel, StudentModel} from "../database/db.models";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {ResponseError} from "../middleware/middleware";
import {StudentService} from "./student.service";
import {dbConnection} from "../database/connect";

export class CoordinatorService {

    static async getCoordinatorStudents(coordinator: CoordinatorModel): Promise<StudentModel[]> {
        const studentsRepo = dbConnection.getRepository(StudentModel);

        return await studentsRepo.find({
            where: {
                coordinatorName: coordinator.name,
                coordinatorFunction: coordinator.function,
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