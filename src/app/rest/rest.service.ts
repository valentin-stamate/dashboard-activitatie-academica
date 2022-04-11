import {
    AcademyMember,
    AllowedStudent,
    AwardAndNomination,
    Citation,
    Coordinator,
    DidacticActivity,
    EditorialMember,
    ISIProceeding,
    OrganizedEvent,
    Patent,
    ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook,
    ScientificCommunication,
    Student,
    Translation,
    WithoutActivity
} from "../database/db.models";
import {
    AcademyMemberModel,
    AdminModel,
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
import {UploadedFile} from "express-fileupload";
import {UtilService} from "../service/util.service";
import {EmailDefaults, MailService} from "../service/email.service";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {Op} from "@sequelize/core";
import {XLSXService,} from "../service/file/xlsx.service";
import JSZip from "jszip";
import {ResponseMessage, StatusCode} from "./rest.util";
import {FormsService} from "../service/forms.service";
import {DocxService} from "../service/file/docx.service";
import {EmailResult} from "../service/models";
import {CryptoUtil} from "../service/crypto.util";
import sha256 from 'crypto-js/sha256';

/** The layer where the logic holds */
export class RestService {
    /************************************************************************************
     *                               Visitor only
     ***********************************************************************************/
    static async check(user: any): Promise<void> {
        let studentRow = await StudentModel.findOne({
            where: {
                id: user.id,
            }});

        let coordinatorRow = await CoordinatorModel.findOne({
            where: {
                id: user.id,
            }});

        let adminRow = await AdminModel.findOne({
            where: {
                id: user.id,
            }});

        if (!studentRow || !coordinatorRow || !adminRow) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return;
    }

    static async signupStudent(identifier: string, email: string, alternativeEmail: string): Promise<void> {
        const existingUser = await StudentModel.findOne({
            where: {
                [Op.or]: [
                    {identifier: identifier},
                ]
            }
        });

        if (existingUser !== null) {
            throw new ResponseError(ResponseMessage.DATA_TAKEN, StatusCode.BAD_REQUEST);
        }

        const row = await AllowedStudentsModel.findOne({
            where: {
                identifier: identifier
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_REGISTERED, StatusCode.NOT_ACCEPTABLE);
        }

        const studentPreInformation = row.toJSON() as AllowedStudent;

        const coordinatorFullName = UtilService.splitSplitProfessorName(studentPreInformation.coordinator);

        const generatedPassword = 'admin';
        const password = CryptoUtil.scufflePassword(generatedPassword);

        const student: Student = {
            identifier: identifier,
            password: sha256(password).toString(),
            fullName: studentPreInformation.fullName,
            email: email,
            alternativeEmail: alternativeEmail,
            attendanceYear: studentPreInformation.attendanceYear,
            coordinatorName: coordinatorFullName[1],
            coordinatorFunction: coordinatorFullName[0],
        }

        try {
            await MailService.sendMail({
                from: EmailDefaults.FROM,
                to: email,
                html: generatedPassword,
            });
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        await StudentModel.create(student as any);
        return;
    }

    static async loginStudent(identifier: string, rawPassword: string): Promise<string> {
        const password = CryptoUtil.scufflePassword(rawPassword);

        const row = await StudentModel.findOne({
            where: {
                identifier: identifier,
                password: sha256(password).toString(),
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Student;

        return JwtService.generateAccessTokenForStudent(user);
    }

    static async loginCoordinator(email: string, code: string): Promise<string> {
        const password = CryptoUtil.scufflePassword(code);

        const row = await StudentModel.findOne({
            where: {
                email: email,
                password: sha256(password).toString(),
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Student;

        return JwtService.generateAccessTokenForStudent(user);
    }

    static async loginAdmin(identifier: string, rawPassword: string): Promise<string> {
        const password = CryptoUtil.scufflePassword(rawPassword);

        const row = await AdminModel.findOne({
            where: {
                username: identifier,
                password: sha256(password).toString(),
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Student;

        return JwtService.generateAccessTokenForStudent(user);
    }

    /************************************************************************************
     *                               User only
     ***********************************************************************************/
    static async getInformation(user: Student): Promise<any> {
        const infoRow = await AllowedStudentsModel.findOne({
            where: {
                identifier: user.identifier
            }
        });
        const userRow = await StudentModel.findOne({
            where: {
                id: user.id
            }
        });

        if (userRow === null) {
            throw new ResponseError(ResponseMessage.NO_USER_FOUND);
        }

        let infoData = {};
        const userData = userRow.toJSON();

        if (infoRow !== null) {
            infoData = infoRow.toJSON();
        }

        return {
            userInformation: userData,
            baseInformation: infoData,
        };
    }

    static async getForms(user: Student): Promise<any> {
        const scArticleISI = (await ScientificArticleISIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const isiProceedings = (await ISIProceedingModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const scArticleBDI = (await ScientificArticleBDIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const scBook = (await ScientificBookModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const translation = (await TranslationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const scCommunication = (await ScientificCommunicationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const patent = (await PatentModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const researchContract = (await ResearchContractModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const citation = (await CitationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const awardsNomination = (await AwardAndNominationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const academyMember = (await AcademyMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const editorialMember = (await EditorialMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const organizedEvent = (await OrganizedEventModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const withoutActivity = (await WithoutActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        const didacticActivity = (await DidacticActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
        return {
            scArticleISI,isiProceedings, scArticleBDI, scBook, translation, scCommunication,
            patent, researchContract, citation, awardsNomination, academyMember, editorialMember,
            organizedEvent, withoutActivity, didacticActivity,
        };
    }

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(user: Student): Promise<any> {
        return (await ScientificArticleISIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleISI(user: Student, data: ScientificArticleISI): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificArticleISIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleISI(user: Student, formId: number, data: ScientificArticleISI): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ScientificArticleISIModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteScientificArticleISI(user: Student, id: number): Promise<void> {
        const row = await ScientificArticleISIModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** ISI proceedings */
    static async getISIProceeding(user: Student): Promise<any> {
        return (await ISIProceedingModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addISIProceeding(user: Student, data: ISIProceeding): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ISIProceedingModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateISIProceeding(user: Student, formId: number, data: ISIProceeding): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ISIProceedingModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteISIProceeding(user: Student, id: number): Promise<void> {
        const row = await ISIProceedingModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    static async getScientificArticleBDI(user: Student): Promise<any> {
        return (await ScientificArticleBDIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleBDI(user: Student, data: ScientificArticleBDI): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificArticleBDIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleBDI(user: Student, formId: number, data: ScientificArticleBDI): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ScientificArticleBDIModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteScientificArticleBDI(user: Student, id: number): Promise<void> {
        const row = await ScientificArticleBDIModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async getScientificBook(user: Student): Promise<any> {
        return (await ScientificBookModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificBook(user: Student, data: ScientificBook): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificBookModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificBook(user: Student, formId: number, data: ScientificBook): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ScientificBookModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteScientificBook(user: Student, id: number): Promise<void> {
        const row = await ScientificBookModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Traduceri */
    static async getTranslation(user: Student): Promise<any> {
        return (await TranslationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addTranslation(user: Student, data: Translation): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await TranslationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateTranslation(user: Student, formId: number, data: Translation): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await TranslationModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteTranslation(user: Student, id: number) {
        const row = await TranslationModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Comunicări în manifestări științifice */
    static async getScientificCommunication(user: Student) {
        return (await ScientificCommunicationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificCommunication(user: Student, data: ScientificCommunication): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificCommunicationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificCommunication(user: Student, formId: number, data: ScientificCommunication) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ScientificCommunicationModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteScientificCommunication(user: Student, id: number) {
        const row = await ScientificCommunicationModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Brevete */
    static async getPatent(user: Student) {
        return (await PatentModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addPatent(user: Student, data: Patent): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await PatentModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updatePatent(user: Student, formId: number, data: Patent) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await PatentModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deletePatent(user: Student, id: number) {
        const row = await PatentModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Contracte de cercetare */
    static async getResearchContract(user: Student) {
        return (await ResearchContractModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addResearchContract(user: Student, data: ResearchContract): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ResearchContractModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateResearchContract(user: Student, formId: number, data: ResearchContract) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await ResearchContractModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteResearchContract(user: Student, id: number) {
        const row = await ResearchContractModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Citări */
    static async getCitation(user: Student) {
        return (await CitationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addCitation(user: Student, data: Citation): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await CitationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateCitation(user: Student, formId: number, data: Citation) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await CitationModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteCitation(user: Student, id: number) {
        const row = await CitationModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Premii si nominalizări */
    static async getAwardAndNomination(user: Student) {
        return (await AwardAndNominationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addAwardAndNomination(user: Student, data: AwardAndNomination): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await AwardAndNominationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAwardAndNomination(user: Student, formId: number, data: AwardAndNomination) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await AwardAndNominationModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteAwardAndNomination(user: Student, id: number) {
        const row = await AwardAndNominationModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Membru în academii */
    static async getAcademyMember(user: Student) {
        return (await AcademyMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addAcademyMember(user: Student, data: AcademyMember): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await AcademyMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAcademyMember(user: Student, formId: number, data: AcademyMember) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await AcademyMemberModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteAcademyMember(user: Student, id: number) {
        const row = await AcademyMemberModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Membru în echipa editorială */
    static async getEditorialMember(user: Student) {
        return (await EditorialMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addEditorialMember(user: Student, data: EditorialMember): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await EditorialMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateEditorialMember(user: Student, formId: number, data: EditorialMember) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await EditorialMemberModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteEditorialMember(user: Student, id: number) {
        const row = await EditorialMemberModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Evenimente organizate */
    static async getOrganizedEvent(user: Student) {
        return (await OrganizedEventModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addOrganizedEvent(user: Student, data: OrganizedEvent): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await OrganizedEventModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateOrganizedEvent(user: Student, formId: number, data: OrganizedEvent) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await OrganizedEventModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteOrganizedEvent(user: Student, id: number) {
        const row = await OrganizedEventModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Fără activitate științifică */
    static async getWithoutActivity(user: Student) {
        return (await WithoutActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addWithoutActivity(user: Student, data: WithoutActivity): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await WithoutActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateWithoutActivity(user: Student, formId: number, data: WithoutActivity) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        const row = await WithoutActivityModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteWithoutActivity(user: Student, id: number) {
        const row = await WithoutActivityModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /** Activitate didactică */
    static async getDidacticActivity(user: Student) {
        return (await DidacticActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addDidacticActivity(user: Student, data: DidacticActivity): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await DidacticActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateDidacticActivity(user: Student, formId: number, data: DidacticActivity) {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }
        
        const row = await DidacticActivityModel.findOne({
            where: {
                owner: user.identifier,
                id: formId,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return;
    }

    static async deleteDidacticActivity(user: Student, id: number) {
        const row = await DidacticActivityModel.findOne({
            where: {
                owner: user.identifier,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return;
    }

    /************************************************************************************
     *                               Admin only
     ***********************************************************************************/
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

    static async getCoordinatorStudents(coordinator: Coordinator): Promise<Student[]> {
        // const rows = (await UserModel.findAll({where: {}}));

        return [];
    }

}
