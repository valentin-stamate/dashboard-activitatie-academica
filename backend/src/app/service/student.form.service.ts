import {StudentModel} from "../database/db.models";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {dbConnection} from "../database/connect";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel, ScientificBookModel, ScientificCommunicationModel, TranslationModel, WithoutActivityModel
} from "../database/forms/db.student.form.models";

export class StudentFormService {

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(student: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleISI",
            ]
        });
        
        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }
        
        return existingStudent.scientificArticleISI;
    }

    static async addScientificArticleISI(student: StudentModel, data: ScientificArticleISIModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleISIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleISI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ScientificArticleISIModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.scientificArticleISI = existingStudent.scientificArticleISI ?? [];
        existingStudent.scientificArticleISI.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateScientificArticleISI(student: StudentModel, reportId: string, data: ScientificArticleISIModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleISIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleISI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificArticleISI = existingStudent.scientificArticleISI ?? [];

        console.log(existingStudent);

        const report = existingStudent.scientificArticleISI.find(item => `${item.id}` === reportId);
        
        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);   
        }
        
        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteScientificArticleISI(student: StudentModel, reportId: string): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleISIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleISI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificArticleISI = existingStudent.scientificArticleISI ?? [];

        const report = existingStudent.scientificArticleISI.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** ISI proceedings */
    static async getISIProceeding(student: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "isiProceeding",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.isiProceeding;
    }

    static async addISIProceeding(student: StudentModel, data: ISIProceedingModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ISIProceedingModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "isiProceeding",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ISIProceedingModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.isiProceeding = existingStudent.isiProceeding ?? [];
        existingStudent.isiProceeding.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateISIProceeding(student: StudentModel, reportId: string, data: ISIProceedingModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ISIProceedingModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "isiProceeding",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.isiProceeding = existingStudent.isiProceeding ?? [];

        const report = existingStudent.isiProceeding.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteISIProceeding(student: StudentModel, reportId: string): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ISIProceedingModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "isiProceeding",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.isiProceeding = existingStudent.isiProceeding ?? [];

        const report = existingStudent.isiProceeding.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    static async getScientificArticleBDI(student: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleBDI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.scientificArticleBDI;
    }

    static async addScientificArticleBDI(student: StudentModel, data: ScientificArticleBDIModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleBDIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleBDI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ScientificArticleBDIModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.scientificArticleBDI = existingStudent.scientificArticleBDI ?? [];
        existingStudent.scientificArticleBDI.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateScientificArticleBDI(student: StudentModel, reportId: string, data: ScientificArticleBDIModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleBDIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleBDI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificArticleBDI = existingStudent.scientificArticleBDI ?? [];

        const report = existingStudent.scientificArticleBDI.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteScientificArticleBDI(student: StudentModel, reportId: string): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificArticleBDIModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificArticleBDI",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificArticleBDI = existingStudent.scientificArticleBDI ?? [];

        const report = existingStudent.scientificArticleBDI.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async getScientificBook(student: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificBook",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.scientificBook;
    }

    static async addScientificBook(student: StudentModel, data: ScientificBookModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificBookModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificBook",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ScientificBookModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.scientificBook = existingStudent.scientificBook ?? [];
        existingStudent.scientificBook.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateScientificBook(student: StudentModel, reportId: string, data: ScientificBookModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificBookModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificBook",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificBook = existingStudent.scientificBook ?? [];

        const report = existingStudent.scientificBook.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteScientificBook(student: StudentModel, reportId: string): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificBookModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificBook",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificBook = existingStudent.scientificBook ?? [];

        const report = existingStudent.scientificBook.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Traduceri */
    static async getTranslation(student: StudentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "translation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.translation;
    }

    static async addTranslation(student: StudentModel, data: TranslationModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(TranslationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "translation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = TranslationModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.translation = existingStudent.translation ?? [];
        existingStudent.translation.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateTranslation(student: StudentModel, reportId: string, data: TranslationModel): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(TranslationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "translation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.translation = existingStudent.translation ?? [];

        const report = existingStudent.translation.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteTranslation(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(TranslationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "translation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.translation = existingStudent.translation ?? [];

        const report = existingStudent.translation.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Comunicări în manifestări științifice */
    static async getScientificCommunication(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificCommunication",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.scientificCommunication;
    }

    static async addScientificCommunication(student: StudentModel, data: ScientificCommunicationModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificCommunicationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificCommunication",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ScientificCommunicationModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.scientificCommunication = existingStudent.scientificCommunication ?? [];
        existingStudent.scientificCommunication.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateScientificCommunication(student: StudentModel, reportId: string, data: ScientificCommunicationModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificCommunicationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificCommunication",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificCommunication = existingStudent.scientificCommunication ?? [];

        const report = existingStudent.scientificCommunication.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteScientificCommunication(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ScientificCommunicationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "scientificCommunication",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.scientificCommunication = existingStudent.scientificCommunication ?? [];

        const report = existingStudent.scientificCommunication.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Brevete */
    static async getPatent(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "patent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.patent;
    }

    static async addPatent(student: StudentModel, data: PatentModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(PatentModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "patent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = PatentModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.patent = existingStudent.patent ?? [];
        existingStudent.patent.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updatePatent(student: StudentModel, reportId: string, data: PatentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(PatentModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "patent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.patent = existingStudent.patent ?? [];

        const report = existingStudent.patent.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deletePatent(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(PatentModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "patent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.patent = existingStudent.patent ?? [];

        const report = existingStudent.patent.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Contracte de cercetare */
    static async getResearchContract(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "researchContract",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.researchContract;
    }

    static async addResearchContract(student: StudentModel, data: ResearchContractModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ResearchContractModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "researchContract",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = ResearchContractModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.researchContract = existingStudent.researchContract ?? [];
        existingStudent.researchContract.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateResearchContract(student: StudentModel, reportId: string, data: ResearchContractModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ResearchContractModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "researchContract",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.researchContract = existingStudent.researchContract ?? [];

        const report = existingStudent.researchContract.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteResearchContract(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(ResearchContractModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "researchContract",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.researchContract = existingStudent.researchContract ?? [];

        const report = existingStudent.researchContract.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Citări */
    static async getCitation(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "citation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.citation;
    }

    static async addCitation(student: StudentModel, data: CitationModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(CitationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "citation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = CitationModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.citation = existingStudent.citation ?? [];
        existingStudent.citation.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateCitation(student: StudentModel, reportId: string, data: CitationModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(CitationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "citation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.citation = existingStudent.citation ?? [];

        const report = existingStudent.citation.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteCitation(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(CitationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "citation",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.citation = existingStudent.citation ?? [];

        const report = existingStudent.citation.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Premii si nominalizări */
    static async getAwardAndNomination(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "awardAndNomination",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.awardAndNomination;
    }

    static async addAwardAndNomination(student: StudentModel, data: AwardAndNominationModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AwardAndNominationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "awardAndNomination",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = AwardAndNominationModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.awardAndNomination = existingStudent.awardAndNomination ?? [];
        existingStudent.awardAndNomination.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateAwardAndNomination(student: StudentModel, reportId: string, data: AwardAndNominationModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AwardAndNominationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "awardAndNomination",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.awardAndNomination = existingStudent.awardAndNomination ?? [];

        const report = existingStudent.awardAndNomination.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteAwardAndNomination(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AwardAndNominationModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "awardAndNomination",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.awardAndNomination = existingStudent.awardAndNomination ?? [];

        const report = existingStudent.awardAndNomination.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Membru în academii */
    static async getAcademyMember(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "academyMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.academyMember;
    }

    static async addAcademyMember(student: StudentModel, data: AcademyMemberModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AcademyMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "academyMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = AcademyMemberModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.academyMember = existingStudent.academyMember ?? [];
        existingStudent.academyMember.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateAcademyMember(student: StudentModel, reportId: string, data: AcademyMemberModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AcademyMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "academyMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.academyMember = existingStudent.academyMember ?? [];

        const report = existingStudent.academyMember.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteAcademyMember(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(AcademyMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "academyMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.academyMember = existingStudent.academyMember ?? [];

        const report = existingStudent.academyMember.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Membru în echipa editorială */
    static async getEditorialMember(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "editorialMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.editorialMember;
    }

    static async addEditorialMember(student: StudentModel, data: EditorialMemberModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(EditorialMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "editorialMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = EditorialMemberModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.editorialMember = existingStudent.editorialMember ?? [];
        existingStudent.editorialMember.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateEditorialMember(student: StudentModel, reportId: string, data: EditorialMemberModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(EditorialMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "editorialMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.editorialMember = existingStudent.editorialMember ?? [];

        const report = existingStudent.editorialMember.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteEditorialMember(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(EditorialMemberModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "editorialMember",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.editorialMember = existingStudent.editorialMember ?? [];

        const report = existingStudent.editorialMember.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Evenimente organizate */
    static async getOrganizedEvent(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "organizedEvent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.scientificArticleISI;
    }

    static async addOrganizedEvent(student: StudentModel, data: OrganizedEventModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(OrganizedEventModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "organizedEvent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = OrganizedEventModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.organizedEvent = existingStudent.organizedEvent ?? [];
        existingStudent.organizedEvent.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateOrganizedEvent(student: StudentModel, reportId: string, data: OrganizedEventModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(OrganizedEventModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "organizedEvent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.organizedEvent = existingStudent.organizedEvent ?? [];

        const report = existingStudent.organizedEvent.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteOrganizedEvent(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(OrganizedEventModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "organizedEvent",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.organizedEvent = existingStudent.organizedEvent ?? [];

        const report = existingStudent.organizedEvent.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Fără activitate științifică */
    static async getWithoutActivity(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "withoutActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.withoutActivity;
    }

    static async addWithoutActivity(student: StudentModel, data: WithoutActivityModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(WithoutActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "withoutActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = WithoutActivityModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.withoutActivity = existingStudent.withoutActivity ?? [];
        existingStudent.withoutActivity.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateWithoutActivity(student: StudentModel, reportId: string, data: WithoutActivityModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(WithoutActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "withoutActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.withoutActivity = existingStudent.withoutActivity ?? [];

        const report = existingStudent.withoutActivity.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteWithoutActivity(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(WithoutActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "withoutActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.withoutActivity = existingStudent.withoutActivity ?? [];

        const report = existingStudent.withoutActivity.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

    /** Activitate didactică */
    static async getDidacticActivity(student: StudentModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "didacticActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return existingStudent.didacticActivity;
    }

    static async addDidacticActivity(student: StudentModel, data: DidacticActivityModel): Promise<any> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(DidacticActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "didacticActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        const report = DidacticActivityModel.fromObject(data);
        await relationRepo.save(report);

        existingStudent.didacticActivity = existingStudent.didacticActivity ?? [];
        existingStudent.didacticActivity.push(report);
        await studentRepo.save(existingStudent);
    }

    static async updateDidacticActivity(student: StudentModel, reportId: string, data: DidacticActivityModel) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(DidacticActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "didacticActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.didacticActivity = existingStudent.didacticActivity ?? [];

        const report = existingStudent.didacticActivity.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        report.update(data);
        await relationRepo.save(report);
    }

    static async deleteDidacticActivity(student: StudentModel, reportId: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const relationRepo = dbConnection.getRepository(DidacticActivityModel);

        const existingStudent = await studentRepo.findOne({
            where: {
                id: student.id,
            },
            relations: [
                "didacticActivity",
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        existingStudent.didacticActivity = existingStudent.didacticActivity ?? [];

        const report = existingStudent.didacticActivity.find(item => `${item.id}` === reportId);

        if (report == null) {
            throw new ResponseError(ResponseMessage.FORM_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await relationRepo.remove(report);
    }

}