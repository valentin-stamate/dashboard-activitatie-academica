import {ResponseError} from "../middleware/middleware";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {XLSXService, XLSXVerificationService} from "../services/file/xlsx.service";
import {MailService} from "../services/email.service";
import {FormsService} from "../services/forms.service";
import JSZip from "jszip";
import {DOCXService} from "../services/file/docx.service";
import {UtilService} from "../services/util.service";
import XLSX from "xlsx";
import {AllowedStudentModel, CoordinatorModel, StudentModel} from "../database/db.models";
import {dbConnection} from "../database/connect";
import {EmailEndpointResponse} from "./models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel, ScientificBookModel, ScientificCommunicationModel, TranslationModel, WithoutActivityModel
} from "../database/forms/db.student.form.models";
import {
    CoordinatorReferentialActivityModel,
    CoordinatorScientificActivityModel
} from "../database/forms/db.coordinator.forms";
import {
    AllowedStudentsHeaders,
    CoordinatorsHeaders,
    ReportsAnnouncementHeaders,
    TimetableHeaders
} from "../services/file/xlsx.utils";

export class AdminService {

    /* Get all the users except to the one that is making the request */
    static async allStudents(): Promise<StudentModel[]> {
        return await dbConnection.getRepository(StudentModel).find({
            order: {
                id: "ASC",
            }
        });
    }

    static async deleteStudent(id: number): Promise<void> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const existingStudent = await studentRepo.findOne({
            where: {
                id: id
            }
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await studentRepo.remove(existingStudent);
        return;
    }

    /* Get all base information except to the one that is making the request */
    static async getAllowedStudents(): Promise<AllowedStudentModel[]> {
        return await dbConnection.getRepository(AllowedStudentModel).find({
            order: {
                id: "ASC",
            }
        });
    }

    static async importAllowedUsers(file: UploadedFile): Promise<number> {
        const checkingResult = XLSXVerificationService.checkExcelFile(file, Object.values(AllowedStudentsHeaders));

        if (checkingResult != null) {
            throw new ResponseError(checkingResult, StatusCode.BAD_REQUEST, ContentType.JSON);
        }

        const baseInformationList = XLSXService.parseExistingStudents(file);

        let rowsCreated = 0;
        const allowedStudentsRepo = dbConnection.getRepository(AllowedStudentModel);

        await allowedStudentsRepo.clear();
        for (let data of baseInformationList) {
            const model = AllowedStudentModel.fromObject(data);
            await allowedStudentsRepo.save(model);
            rowsCreated++;
        }

        return rowsCreated;
    }

    static async deleteAllowedStudent(id: number) {
        const allowedStudentRepo = dbConnection.getRepository(AllowedStudentModel);
        const existingAllowedStudent = await allowedStudentRepo.findOne({
            where: {
                id: id,
            }
        });

        if (existingAllowedStudent === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await allowedStudentRepo.remove(existingAllowedStudent);
        return;
    }

    static async exportForms(): Promise<Buffer> {
        /* Student Data */
        const studentRepo = dbConnection.getRepository(StudentModel);
        const studentsRows: StudentModel[] = await studentRepo.find({
            where: {
                isActive: true,
            },
            order: {
                id: "ASC",
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

        /* I know this it's not readable but yeah, many forms */
        let scArticleISI = studentsRows.reduce((prev, item) => {prev.push(...(item.scientificArticleISI ?? [])); return prev;}, [] as ScientificArticleISIModel[]);

        let isiProceedings = studentsRows.reduce((prev, item) => { prev.push(...(item.isiProceeding ?? [])); return prev;}, [] as ISIProceedingModel[]);
        let scArticleBDI = studentsRows.reduce((prev, item) => {prev.push(...(item.scientificArticleBDI ?? [])); return prev;}, [] as ScientificArticleBDIModel[]);
        let scBook = studentsRows.reduce((prev, item) => {prev.push(...(item.scientificBook ?? [])); return prev;}, [] as ScientificBookModel[]);
        let translation = studentsRows.reduce((prev, item) => {prev.push(...(item.translation ?? [])); return prev;}, [] as TranslationModel[]);
        let scCommunication = studentsRows.reduce((prev, item) => {prev.push(...(item.scientificCommunication ?? [])); return prev;}, [] as ScientificCommunicationModel[]);
        let patent = studentsRows.reduce((prev, item) => {prev.push(...(item.patent ?? [])); return prev;}, [] as PatentModel[]);
        let researchContract = studentsRows.reduce((prev, item) => {prev.push(...(item.researchContract ?? [])); return prev;}, [] as ResearchContractModel[]);
        let citation = studentsRows.reduce((prev, item) => {prev.push(...(item.citation ?? [])); return prev;}, [] as CitationModel[]);
        let awardsNomination = studentsRows.reduce((prev, item) => {prev.push(...(item.awardAndNomination ?? [])); return prev;}, [] as AwardAndNominationModel[]);
        let academyMember = studentsRows.reduce((prev, item) => {prev.push(...(item.academyMember ?? [])); return prev;}, [] as AcademyMemberModel[]);
        let editorialMember = studentsRows.reduce((prev, item) => {prev.push(...(item.editorialMember ?? [])); return prev;}, [] as EditorialMemberModel[]);
        let organizedEvent = studentsRows.reduce((prev, item) => {prev.push(...(item.organizedEvent ?? [])); return prev;}, [] as OrganizedEventModel[]);
        let withoutActivity = studentsRows.reduce((prev, item) => {prev.push(...(item.withoutActivity ?? [])); return prev;}, [] as WithoutActivityModel[]);
        let didacticActivity = studentsRows.reduce((prev, item) => {prev.push(...(item.didacticActivity ?? [])); return prev;}, [] as DidacticActivityModel[]);

        const scISISheet = FormsService.getScientificArticleISISheet(scArticleISI);
        const isiProceedingsSheet = FormsService.getISIProceedingsSheet(isiProceedings);
        const scArticleBDISheet = FormsService.getScientificArticleBDISheet(scArticleBDI);
        const scBookSheet = FormsService.getScientificBookSheet(scBook);
        const translationSheet = FormsService.getTranslationSheet(translation);
        const scCommunicationSheet = FormsService.getScientificCommunicationSheet(scCommunication);
        const patentSheet = FormsService.getPatentSheet(patent);
        const researchContractSheet = FormsService.getResearchContractSheet(researchContract);
        const citationSheet = FormsService.getCitationSheet(citation);
        const awardsNominationSheet = FormsService.getAwardAndNominationSheet(awardsNomination);
        const academyMemberSheet = FormsService.getAcademyMemberSheet(academyMember);
        const editorialMemberSheet = FormsService.getEditorialMemberSheet(editorialMember);
        const organizedEventSheet = FormsService.getOrganizedEventSheet(organizedEvent);
        const withoutActivitySheet = FormsService.getWithoutActivitySheet(withoutActivity);
        const didacticActivitySheet = FormsService.getDidacticActivitySheet(didacticActivity);

        const studentDataWorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(studentDataWorkBook, scISISheet, 'Articole ştiintifice...ISI...');
        XLSX.utils.book_append_sheet(studentDataWorkBook, isiProceedingsSheet, 'ISI proceedings');
        XLSX.utils.book_append_sheet(studentDataWorkBook, scArticleBDISheet, 'Articole științifice...BDI..');
        XLSX.utils.book_append_sheet(studentDataWorkBook, scBookSheet, 'Cărţi ştiinţifice...');
        XLSX.utils.book_append_sheet(studentDataWorkBook, translationSheet, 'Traduceri');
        XLSX.utils.book_append_sheet(studentDataWorkBook, scCommunicationSheet, 'Comunicări...');
        XLSX.utils.book_append_sheet(studentDataWorkBook, patentSheet, 'Brevete');
        XLSX.utils.book_append_sheet(studentDataWorkBook, researchContractSheet, 'Contracte de cercetare');
        XLSX.utils.book_append_sheet(studentDataWorkBook, citationSheet, 'Citări');
        XLSX.utils.book_append_sheet(studentDataWorkBook, awardsNominationSheet, 'Premii si nominalizari');
        XLSX.utils.book_append_sheet(studentDataWorkBook, academyMemberSheet, 'Membru în academii');
        XLSX.utils.book_append_sheet(studentDataWorkBook, editorialMemberSheet, 'Membru în echipa editorială');
        XLSX.utils.book_append_sheet(studentDataWorkBook, organizedEventSheet, 'Evenimente organizate');
        XLSX.utils.book_append_sheet(studentDataWorkBook, withoutActivitySheet, 'Fără activitate științifică');
        XLSX.utils.book_append_sheet(studentDataWorkBook, didacticActivitySheet, 'Activitate didactică');

        /* Coordinators Data */
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        let coordinatorsRows: CoordinatorModel[] = (await coordinatorRepo.find({
            order: {
                id: "ASC",
            },
            relations: [
                "scientificActivity",
                "referentialActivity",
            ],
        }));

        const coordinatorScientificActivity = coordinatorsRows.reduce((prev, item) => {prev.push(...(item.scientificActivity == null ? [] : [item.scientificActivity])); return prev;}, [] as CoordinatorScientificActivityModel[]);
        const coordinatorReferenceActivity = coordinatorsRows.reduce((prev, item) => {prev.push(...(item.referentialActivity == null ? [] : [item.referentialActivity])); return prev;}, [] as CoordinatorReferentialActivityModel[]);

        const coordinatorScientificActivitySheet = FormsService.getCoordinatorScientificActivitySheet(coordinatorScientificActivity);
        const coordinatorReferenceActivitySheet = FormsService.getCoordinatorReferenceActivitySheet(coordinatorReferenceActivity);

        const coordinatorDataWorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(coordinatorDataWorkBook, coordinatorScientificActivitySheet, 'Activitatea științifică');
        XLSX.utils.book_append_sheet(coordinatorDataWorkBook, coordinatorReferenceActivitySheet, 'Activitatea referențială');

        const studentFormsBuffer = new Buffer(XLSX.write(studentDataWorkBook, {bookType: 'xlsx', type: 'buffer'}));
        const coordinatorFormsBuffer = new Buffer(XLSX.write(coordinatorDataWorkBook, {bookType: 'xlsx', type: 'buffer'}));

        const zip = new JSZip();
        /* Generate Excel Buffer With Exported Student Data */
        zip.file(`forms_students_${UtilService.stringDate(new Date())}.xlsx`, studentFormsBuffer, {compression: 'DEFLATE'});
        zip.file(`forms_coordinator_${UtilService.stringDate(new Date())}.xlsx`, coordinatorFormsBuffer, {compression: 'DEFLATE'});

        return await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' });
    }

    static async faz(timetableFile: UploadedFile, afterTableNote: string, month: number, ignoreStart: number, ignoreEnd: number): Promise<any> {
        const fazProfessorDataList = XLSXService.parseFAZ(timetableFile, month, ignoreStart, ignoreEnd);

        const zip = new JSZip();

        for (let data of fazProfessorDataList) {
            const docxBuffer = DOCXService.getFazDOCXBuffer(data, afterTableNote);

            /* Append the buffer to the zip */
            zip.file(`FAZ ${data.professorFunction} ${data.professorName}.docx`, docxBuffer, {compression: 'DEFLATE'});
        }

        return await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' });
    }

    static async importCoordinators(file: UploadedFile): Promise<number> {
        const checkingResult = XLSXVerificationService.checkExcelFile(file, Object.values(CoordinatorsHeaders));

        if (checkingResult != null) {
            throw new ResponseError(checkingResult, StatusCode.BAD_REQUEST, ContentType.JSON);
        }

        const coordinators = XLSXService.parseCoordinatorsExcel(file);

        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        await coordinatorRepo.clear();

        let rowsCreated = 0;
        for (let item of coordinators) {
            const model = CoordinatorModel.fromObject(item);
            await coordinatorRepo.create(model);
            rowsCreated++;
        }

        return rowsCreated;
    }

    static async getCoordinators(): Promise<CoordinatorModel[]> {
        return await dbConnection.getRepository(CoordinatorModel).find();
    }

}