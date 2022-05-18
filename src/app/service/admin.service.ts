import {Coordinator, EmailEndpointResponse, SuccessfulEmail} from "../database/models";
import {
    AcademyMemberModel,
    AllowedStudentsModel,
    AwardAndNominationModel,
    CitationModel,
    CoordinatorModel, CoordinatorReferentialActivityModel, CoordinatorScientificActivityModel,
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
    StudentModel,
    TranslationModel,
    WithoutActivityModel
} from "../database/sequelize";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {UploadedFile} from "express-fileupload";
import {XLSXService} from "../services/file/xlsx.service";
import {MailService} from "../services/email.service";
import {FormsService} from "../services/forms.service";
import JSZip from "jszip";
import {DocxService} from "../services/file/docx.service";
import {UtilService} from "../services/util.service";
import sha256 from "crypto-js/sha256";
import {CryptoUtil} from "../services/crypto.util";
import XLSX from "xlsx";

export class AdminService {

    /* Get all the users except to the one that is making the request */
    static async allStudents(): Promise<any> {
        const rows = await StudentModel.findAll({
            order: ['id'],
        });

        return rows.map(item => item.toJSON());
    }

    static async deleteStudent(id: number): Promise<void> {
        const row = await StudentModel.findOne({
            where: {
                id: id
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /* Get all base information except to the one that is making the request */
    static async getBaseInformation() {
        return (await AllowedStudentsModel.findAll({
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async importBaseInformation(file: UploadedFile): Promise<number> {
        const baseInformationList = XLSXService.parseExistingStudents(file);

        let rowsCreated = 0;
        for (let data of baseInformationList) {
            await AllowedStudentsModel.create(data as any);
            rowsCreated++;
        }

        return rowsCreated;
    }

    static async deleteBaseInformation(id: number) {
        const row = await AllowedStudentsModel.findOne({
            where: {
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
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
                destination: data.emailTo,
                html: emailContent,
            });

            if (!send) {
                continue;
            }
            /* Sending the email */

            try {
                await MailService.sendMail({
                    from: from,
                    subject: subject,
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
        let scArticleISI =     (await ScientificArticleISIModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let isiProceedings =   (await ISIProceedingModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let scArticleBDI =     (await ScientificArticleBDIModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let scBook =           (await ScientificBookModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let translation =      (await TranslationModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let scCommunication =  (await ScientificCommunicationModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let patent =           (await PatentModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let researchContract = (await ResearchContractModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let citation =         (await CitationModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let awardsNomination = (await AwardAndNominationModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let academyMember =    (await AcademyMemberModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let editorialMember =  (await EditorialMemberModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let organizedEvent =   (await OrganizedEventModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let withoutActivity =  (await WithoutActivityModel.findAll({order: ['id'],})).map(item => item.toJSON());
        let didacticActivity = (await DidacticActivityModel.findAll({order: ['id'],})).map(item => item.toJSON());

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
        const coordinatorScientificActivity = (await CoordinatorScientificActivityModel.findAll({order: ['id'],})).map(item => item.toJSON());
        const coordinatorReferenceActivity =  (await CoordinatorReferentialActivityModel.findAll({order: ['id'],})).map(item => item.toJSON());

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

    static async faz(timetableFile: UploadedFile, afterTableNote: string, ignoreStart: number, ignoreEnd: number): Promise<any> {
        const fazProfessorDataList = XLSXService.parseFAZ(timetableFile, ignoreStart, ignoreEnd);

        const zip = new JSZip();

        for (let data of fazProfessorDataList) {
            const docxBuffer = DocxService.getFazDOCXBuffer(data, afterTableNote);

            /* Append the buffer to the zip */
            zip.file(`FAZ ${data.professorFunction} ${data.professorName}.docx`, docxBuffer, {compression: 'DEFLATE'});
        }

        return await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' });
    }

    static async sendVerbalProcess(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[], send: boolean): Promise<EmailEndpointResponse> {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file);

        const emailEndpointResponse: EmailEndpointResponse = {
            emailPreview: [],
            successfulEmails: [],
        };

        for (let data of verbalProcessDataList) {
            if (recipientExceptList.some(item => item === data.studentEmail)) {
                continue;
            }

            const buffer = await DocxService.getVerbalProcessDOCXBuffer(data);
            const filename = `Proces_verbal_${data.studentName} ${data.report}.docx`;

            let emailContent = emailTemplate;
            emailContent = emailContent.replace(new RegExp(/{{report}}/g), data.report[1]);
            emailContent = emailContent.replace(new RegExp(/{{studentName}}/g), data.studentName);

            emailEndpointResponse.emailPreview.push({
                destination: data.studentEmail,
                html: emailContent,
            });

            if (!send) {
                continue;
            }

            try {
                await MailService.sendMail({
                    from: from,
                    subject: `${subject} nr. ${data.report[1]} - drd. ${data.studentName}`,
                    to: data.studentEmail,
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

    static async sendThesisEmailNotification(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[], sent: boolean): Promise<EmailEndpointResponse> {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file);

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

            emailEndpointResponse.emailPreview.push({
                destination: data.studentEmail,
                html: emailContent,
            });

            if (!sent) {
                continue;
            }

            try {
                await MailService.sendMail({
                    subject: `${subject} ${data.report[1]}`,
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

        await CoordinatorModel.destroy({where: {}});

        let rowsCreated = 0;
        for (let item of coordinators) {
            item.password = sha256(CryptoUtil.scufflePassword(item.password)).toString();
            await CoordinatorModel.create(item as any);
            rowsCreated++;
        }

        return rowsCreated;
    }

    static async getCoordinators(): Promise<Coordinator[]> {
        return (await CoordinatorModel.findAll({where: {}})).map(item => item.toJSON() as Coordinator);
    }

}