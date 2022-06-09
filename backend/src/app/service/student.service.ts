import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {StudentModel} from "../database/db.models";
import {dbConnection} from "../database/connect";
import {MailService} from "../services/email.service";

export class StudentService {
    
    static async sendMail(student: StudentModel, subject: string, to: string, htmlEmail: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        
        const existingStudent = await studentRepo.findOne({
            where: {
                identifier: student.identifier,
            }
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND);
        }
        
        await MailService.sendMail({
            subject: subject,
            from: `Școala Doctorală FII - ${existingStudent.fullName} <${existingStudent.email}>`,
            to: to,
            html: htmlEmail,
        });
    }
    
    static async getInformation(studentModel: StudentModel): Promise<StudentModel> {
        const existingStudent = await dbConnection.getRepository(StudentModel).findOne({
            where: {
                id: studentModel.id
            }
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND);
        }

        return studentModel;
    }

    static async getForms(studentModel: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: studentModel.id,
            },
            relations: [
                "scientificArticleISI",
                "isiProceeding",
                "scientificArticleBDI",
                "scientificBook",
                "translation",
                "scientificCommunication",
                "patent",
                "researchContract",
                "citation",
                "awardAndNomination",
                "academyMember",
                "editorialMember",
                "organizedEvent",
                "withoutActivity",
                "didacticActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const scArticleISI     = existingStudent.scientificArticleISI;
        const isiProceedings   = existingStudent.isiProceeding;
        const scArticleBDI     = existingStudent.scientificArticleBDI;
        const scBook           = existingStudent.scientificBook;
        const translation      = existingStudent.translation;
        const scCommunication  = existingStudent.scientificCommunication;
        const patent           = existingStudent.patent;
        const researchContract = existingStudent.researchContract;
        const citation         = existingStudent.citation;
        const awardsNomination = existingStudent.awardAndNomination;
        const academyMember    = existingStudent.academyMember;
        const editorialMember  = existingStudent.editorialMember;
        const organizedEvent   = existingStudent.organizedEvent;
        const withoutActivity  = existingStudent.withoutActivity;
        const didacticActivity = existingStudent.didacticActivity;

        return {
            scArticleISI,
            isiProceedings,
            scArticleBDI,
            scBook,
            translation,
            scCommunication,
            patent,
            researchContract,
            citation,
            awardsNomination,
            academyMember,
            editorialMember,
            organizedEvent,
            withoutActivity,
            didacticActivity,
        };
    }

}