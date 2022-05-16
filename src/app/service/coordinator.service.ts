import {Coordinator, Student} from "../database/models";
import {StudentModel} from "../database/sequelize";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {ResponseError} from "../middleware/middleware";
import {StudentService} from "./student.service";

export class CoordinatorService {

    static async getCoordinatorStudents(coordinator: Coordinator): Promise<Student[]> {

        return (await StudentModel.findAll({
            where: {
                coordinatorName: coordinator.name,
            }}))
            .map(item => {
                const studentJSON = item.toJSON();
                return studentJSON as Student
            });
    }

    static async getCoordinatorStudentForms(coordinator: Coordinator, studentIdentifier: string): Promise<any[]> {
        const existingStudent = await StudentModel.findOne({
            where: {
                identifier: studentIdentifier,
                coordinatorName: coordinator.name,
            }
        });

        if (!existingStudent) {
            throw new ResponseError(ResponseMessage.NO_USER_FOUND, StatusCode.NOT_FOUND);
        }

        return await StudentService.getForms(existingStudent.toJSON() as Student);
    }

}