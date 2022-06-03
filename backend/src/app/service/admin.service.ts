import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {XLSXService} from "../services/file/xlsx.service";
import {MailService} from "../services/email.service";
import {FormsService} from "../services/forms.service";
import JSZip from "jszip";
import {DocxService} from "../services/file/docx.service";
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

    static async sendSemesterActivityEmail(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[], send: boolean): Promise<EmailEndpointResponse> {
        const semesterActivityDataList = XLSXService.parseSemesterActivityTimetable(file);

        const emailEndpointResponse: EmailEndpointResponse = {
            emailPreview: [],
            successfulEmails: [],
        };

        for (let data of semesterActivityDataList) {
            if (recipientExceptList.some(item => item === data.emailTo)) {
                continue;
            }

            let emailActivityContent: string = data.professorActivity
                .map(item => `${item.activity} ${item.weekHours} ore/săptămână`)
                .join(`<br>`);

            const emailContent = emailTemplate.replace(new RegExp(/{{activity}}/g), emailActivityContent);

            emailEndpointResponse.emailPreview.push({
                from: from,
                to: data.emailTo,
                subject: subject,
                html: emailContent,
                attachments: [],
                cc: [],
            });

            if (!send) {
                continue;
            }
            /* Sending the email */

            try {
                await MailService.sendMail({
                    subject: subject,
                    from: from,
                    to: data.emailTo,
                    html: emailContent,
                });

                emailEndpointResponse.successfulEmails.push({email: data.emailTo, success: true});
            } catch (err) {
                console.log(err);
                emailEndpointResponse.successfulEmails.push({email: data.emailTo, success: false});
            }

        }

        return emailEndpointResponse;
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

        const coordinatorScientificActivity = coordinatorsRows.reduce((prev, item) => {prev.push(item.scientificActivity); return prev;}, [] as CoordinatorScientificActivityModel[]);
        const coordinatorReferenceActivity = coordinatorsRows.reduce((prev, item) => {prev.push(item.referentialActivity); return prev;}, [] as CoordinatorReferentialActivityModel[]);

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
            const docxBuffer = DocxService.getFazDOCXBuffer(data, afterTableNote);

            /* Append the buffer to the zip */
            zip.file(`FAZ ${data.professorFunction} ${data.professorName}.docx`, docxBuffer, {compression: 'DEFLATE'});
        }

        return await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' });
    }

    static async sendVerbalProcess(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[], send: boolean): Promise<EmailEndpointResponse> {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file, true);

        const emailEndpointResponse: EmailEndpointResponse = {
            emailPreview: [],
            successfulEmails: [],
        };

        for (let data of verbalProcessDataList) {
            if (recipientExceptList.some(item => item === data.studentEmail)) {
                continue;
            }

            const buffer = await DocxService.getVerbalProcessDOCXBuffer(data);
            const filename = `Proces_verbal_raport_${data.studentName} ${data.report}.docx`;
            const parsedSubject = `${subject} ${data.report[1]} ${data.studentName}`;

            let emailContent = emailTemplate;
            emailContent = emailContent.replace(new RegExp(/{{report}}/g), data.report[1]);
            emailContent = emailContent.replace(new RegExp(/{{studentName}}/g), data.studentName);

            emailEndpointResponse.emailPreview.push({
                from: from,
                to: data.coordinatorEmail,
                subject: parsedSubject,
                html: emailContent,
                attachments: [filename],
                cc: [],
            });

            if (!send) {
                continue;
            }

            try {
                await MailService.sendMail({
                    subject: parsedSubject,
                    from: from,
                    to: data.coordinatorEmail,
                    html: emailContent,
                    attachments: [{
                        content: buffer,
                        filename: filename,
                    }],
                });

                emailEndpointResponse.successfulEmails.push({
                    email: data.studentEmail,
                    success: true,
                });
            } catch (err) {
                console.log(err);
                emailEndpointResponse.successfulEmails.push({
                    email: data.studentEmail,
                    success: false,
                });
            }
        }

        return emailEndpointResponse;
    }

    static async sendThesisEmailNotification(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[], sent: boolean, startDate: Date, endDate: Date): Promise<EmailEndpointResponse> {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file, false, startDate, endDate);

        const emailEndpointResponse: EmailEndpointResponse = {
            emailPreview: [],
            successfulEmails: [],
        };

        for (const data of verbalProcessDataList) {
            if (recipientExceptList.some(item => item === data.studentEmail)) {
                continue;
            }

            let commission = '';
            commission += `${data.coordinators[1].coordinatorName}<br>`;
            commission += `${data.coordinators[2].coordinatorName}<br>`;
            commission += `${data.coordinators[3].coordinatorName}`;

            let emailContent = emailTemplate;
            emailContent = emailContent.replace(new RegExp(/{{date}}/g), UtilService.simpleStringDate(data.presentationDate));
            emailContent = emailContent.replace(new RegExp(/{{reportTitle}}/g), data.reportTitle);
            emailContent = emailContent.replace(new RegExp(/{{coordinator}}/g), data.coordinators[0].coordinatorName);
            emailContent = emailContent.replace(new RegExp(/{{commission}}/g), commission);

            const parsedSubject = `${subject} ${data.studentName}`;

            emailEndpointResponse.emailPreview.push({
                from: from,
                to: data.studentEmail,
                subject: parsedSubject,
                html: emailContent,
                attachments: [],
                cc: [data.coordinatorEmail],
            });

            if (!sent) {
                continue;
            }

            try {
                await MailService.sendMail({
                    subject: parsedSubject,
                    from: from,
                    to: data.studentEmail,
                    cc: [data.coordinatorEmail],
                    html: emailContent,
                });

                emailEndpointResponse.successfulEmails.push({
                    email: data.studentEmail,
                    success: true,
                });
            } catch (err) {
                console.log(err);

                emailEndpointResponse.successfulEmails.push({
                    email: data.studentEmail,
                    success: false,
                });
            }
        }

        return emailEndpointResponse;
    }

    static async importCoordinators(file: UploadedFile): Promise<number> {
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