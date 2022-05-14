import {Coordinator, EmailResult, Student} from "../database/models";
import {
    AcademyMemberModel,
    AllowedStudentsModel,
    AwardAndNominationModel,
    CitationModel,
    CoordinatorModel,
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
import {Op} from "@sequelize/core";
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

export class AdminService {

    /* Get all the users except to the one that is making the request */
    static async allUsers(userExcept: Student): Promise<any> {
        const rows = await StudentModel.findAll({
            where: {
                id: {[Op.not]: userExcept.id},
            },
            order: ['id'],
        });

        return rows.map(item => item.toJSON());
    }

    static async deleteUser(id: number): Promise<void> {
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
    static async getBaseInformation(user: Student) {
        return (await AllowedStudentsModel.findAll({
            where: {
                identifier: {[Op.not]: user.identifier},
            },
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

    static async sendSemesterActivityEmail(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[]): Promise<any> {
        const semesterActivityDataList = XLSXService.parseSemesterActivityTimetable(file);

        const emailResults: EmailResult[] = [];
        for (let data of semesterActivityDataList) {
            if (recipientExceptList.some(item => item === data.emailTo)) {
                continue;
            }

            let emailActivityContent: string = data.professorActivity
                .map(item => `${item.activity} ${item.weekHours} ore/săptămână`)
                .join(`<br>`);

            const emailContent = emailTemplate.replace(new RegExp(/{{activity}}/g), emailActivityContent);

            /* Sending the email */

            try {
                await MailService.sendMail({
                    from: from,
                    subject: subject,
                    to: data.emailTo,
                    html: emailContent,
                });

                emailResults.push({email: data.emailTo, success: true});
            } catch (err) {
                console.log(err);
                emailResults.push({email: data.emailTo, success: false});
            }

        }

        return emailResults;
    }

    static async exportForms(): Promise<Buffer> {
        const XLSX = require('XLSX');

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

        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, scISISheet, 'Articole ştiintifice...ISI...');
        XLSX.utils.book_append_sheet(workBook, isiProceedingsSheet, 'ISI proceedings');
        XLSX.utils.book_append_sheet(workBook, scArticleBDISheet, 'Articole științifice...BDI..');
        XLSX.utils.book_append_sheet(workBook, scBookSheet, 'Cărţi ştiinţifice...');
        XLSX.utils.book_append_sheet(workBook, translationSheet, 'Traduceri');
        XLSX.utils.book_append_sheet(workBook, scCommunicationSheet, 'Comunicări...');
        XLSX.utils.book_append_sheet(workBook, patentSheet, 'Brevete');
        XLSX.utils.book_append_sheet(workBook, researchContractSheet, 'Contracte de cercetare');
        XLSX.utils.book_append_sheet(workBook, citationSheet, 'Citări');
        XLSX.utils.book_append_sheet(workBook, awardsNominationSheet, 'Premii si nominalizari');
        XLSX.utils.book_append_sheet(workBook, academyMemberSheet, 'Membru în academii');
        XLSX.utils.book_append_sheet(workBook, editorialMemberSheet, 'Membru în echipa editorială');
        XLSX.utils.book_append_sheet(workBook, organizedEventSheet, 'Evenimente organizate');
        XLSX.utils.book_append_sheet(workBook, withoutActivitySheet, 'Fără activitate științifică');
        XLSX.utils.book_append_sheet(workBook, didacticActivitySheet, 'Activitate didactică');

        /* Generate Excel Buffer and return */
        return new Buffer(XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'}));
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

    static async sendVerbalProcess(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[]): Promise<EmailResult[]> {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file);

        const emailResults: EmailResult[] = [];

        for (let data of verbalProcessDataList) {
            if (recipientExceptList.some(item => item === data.studentEmail)) {
                continue;
            }

            const buffer = await DocxService.getVerbalProcessDOCXBuffer(data);
            const filename = `Proces_verbal_${data.studentName} ${data.report}.docx`;

            let emailContent = emailTemplate;
            emailContent = emailContent.replace(new RegExp(/{{report}}/g), data.report[1]);
            emailContent = emailContent.replace(new RegExp(/{{studentName}}/g), data.studentName);

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

                emailResults.push({
                    email: data.studentEmail,
                    success: true,
                });
            } catch (err) {
                console.log(err);
                emailResults.push({
                    email: data.studentEmail,
                    success: true,
                });
            }
        }

        return emailResults;
    }

    static async sendThesisEmailNotification(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[]) {
        const verbalProcessDataList = XLSXService.parseReportAnnouncement(file);

        const emailResults: EmailResult[] = [];

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

            try {
                await MailService.sendMail({
                    subject: `${subject} ${data.report[1]}`,
                    from: from,
                    to: data.studentEmail,
                    cc: [data.coordinatorEmail],
                    html: emailContent,
                });

                emailResults.push({
                    email: data.studentEmail,
                    success: true,
                });
            } catch (err) {
                console.log(err);

                emailResults.push({
                    email: data.studentEmail,
                    success: false,
                });
            }
        }

        return emailResults;
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