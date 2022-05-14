import {Coordinator, Student} from "../database/models";
import {StudentModel} from "../database/sequelize";

export class CoordinatorService {

    static async getCoordinatorStudents(coordinator: Coordinator): Promise<Student[]> {

        return (await StudentModel.findAll({
            where: {
                coordinatorName: coordinator.name,
            }}))
            .map(item => {
                const studentJSON = item.toJSON();
                delete studentJSON.password;
                return studentJSON as Student
            });
    }

}