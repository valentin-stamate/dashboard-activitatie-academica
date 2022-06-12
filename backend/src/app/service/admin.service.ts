import {ResponseError} from "../middleware/middleware";
import {ContentType, ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {XLSXService, XLSXVerificationService} from "../services/file/xlsx.service";
import {FormsService} from "../services/forms.service";
import JSZip from "jszip";
import {DOCXService} from "../services/file/docx.service";
import {UtilService} from "../services/util.service";
import XLSX from "xlsx";
import {AllowedStudentModel, CoordinatorModel, StudentModel} from "../database/db.models";
import {dbConnection} from "../database/connect";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel,
    DidacticActivityModel,
    EditorialMemberModel,
    ISIProceedingModel,
    OrganizedEventModel,
    PatentModel,
    ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel,
    ScientificBookModel,
    ScientificCommunicationModel,
    TranslationModel,
    WithoutActivityModel
} from "../database/forms/db.student.form.models";
import {
    CoordinatorReferentialActivityModel,
    CoordinatorScientificActivityModel
} from "../database/forms/db.coordinator.forms";
import {AllowedStudentsHeaders, CoordinatorsHeaders, TimetableHeaders} from "../services/file/xlsx.utils";

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

        const allowedStudentsList = XLSXService.parseExistingStudents(file);

        let rowsCreated = 0;
        const allowedStudentsRepo = dbConnection.getRepository(AllowedStudentModel);
        const studentsRepo = dbConnection.getRepository(StudentModel);

        await allowedStudentsRepo.clear();

        await studentsRepo.createQueryBuilder()
            .update()
            .set({isActive: false})
            .execute();

        for (let data of allowedStudentsList) {
            const model = AllowedStudentModel.fromObject(data);
            await allowedStudentsRepo.save(model);

            await studentsRepo.createQueryBuilder()
                .update()
                .set({isActive: true})
                .where(`identifier = :identifier`, {identifier: model.identifier});

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
        const scArticleISI =     studentsRows.reduce((prev, item) => {prev.push(...(item.scientificArticleISI ?? [])   .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const isiProceedings =   studentsRows.reduce((prev, item) => {prev.push(...(item.isiProceeding ?? [])          .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const scArticleBDI =     studentsRows.reduce((prev, item) => {prev.push(...(item.scientificArticleBDI ?? [])   .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const scBook =           studentsRows.reduce((prev, item) => {prev.push(...(item.scientificBook ?? [])         .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const translation =      studentsRows.reduce((prev, item) => {prev.push(...(item.translation ?? [])            .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const scCommunication =  studentsRows.reduce((prev, item) => {prev.push(...(item.scientificCommunication ?? []).map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const patent =           studentsRows.reduce((prev, item) => {prev.push(...(item.patent ?? [])                 .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const researchContract = studentsRows.reduce((prev, item) => {prev.push(...(item.researchContract ?? [])       .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const citation =         studentsRows.reduce((prev, item) => {prev.push(...(item.citation ?? [])               .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const awardsNomination = studentsRows.reduce((prev, item) => {prev.push(...(item.awardAndNomination ?? [])     .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const academyMember =    studentsRows.reduce((prev, item) => {prev.push(...(item.academyMember ?? [])          .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const editorialMember =  studentsRows.reduce((prev, item) => {prev.push(...(item.editorialMember ?? [])        .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const organizedEvent =   studentsRows.reduce((prev, item) => {prev.push(...(item.organizedEvent ?? [])         .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const withoutActivity =  studentsRows.reduce((prev, item) => {prev.push(...(item.withoutActivity ?? [])        .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);
        const didacticActivity = studentsRows.reduce((prev, item) => {prev.push(...(item.didacticActivity ?? [])       .map((row: any) => {return {...row, owner: item.identifier};})); return prev;}, [] as any[]);

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

        const coordinatorScientificActivity = coordinatorsRows.reduce((prev, item) => {prev.push(...(item.scientificActivity == null ? [] : [{...item.scientificActivity, owner: `${item.function} ${item.name}`}])); return prev;}, [] as any[]);
        const coordinatorReferenceActivity = coordinatorsRows.reduce((prev, item) => {prev.push(...(item.referentialActivity == null ? [] : [{...item.referentialActivity, owner: `${item.function} ${item.name}`}])); return prev;}, [] as any[]);

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

    static async faz(timetableFile: UploadedFile, afterTableNote: string, month: number, intervals: Interval[]): Promise<any> {
        const checkingResult = XLSXVerificationService.checkExcelFile(timetableFile, Object.values(TimetableHeaders));

        if (checkingResult != null) {
            throw new ResponseError(checkingResult, StatusCode.BAD_REQUEST, ContentType.JSON);
        }

        const fazProfessorDataList = XLSXService.parseFAZ(timetableFile, month, intervals);

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

export interface Interval {
    start: number;
    end: number;
}