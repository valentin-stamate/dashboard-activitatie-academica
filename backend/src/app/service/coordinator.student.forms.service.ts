import {StudentModel} from "../database/db.models";
import {dbConnection} from "../database/connect";
import {DocxReportsService} from "../services/file/docx.reports.service";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";

export class CoordinatorStudentFormsService {

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(studentIdentifier: string, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                identifier: studentIdentifier,
            },
            relations: ['scientificArticleISI'],
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const report = (existingStudent.scientificArticleISI ?? []).find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const buffer = DocxReportsService.generateScientificArticleISI(report);

        return buffer;
    }

}