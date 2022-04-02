import {
    AcademyMember,
    AwardAndNomination,
    BaseInformation,
    Citation,
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
    Translation,
    User,
    WithoutActivity
} from "../database/models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    BaseInformationModel,
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
    UserKeyModel,
    UserModel,
    WithoutActivityModel
} from "../database/sequelize";
import {UploadedFile} from "express-fileupload";
import XLSX from "xlsx";
import {UtilService} from "../service/util.service";
import {EmailDefaults, LoginMessage, MailService} from "../service/email.service";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {Op} from "@sequelize/core";
import {BaseInformationHeaders, SemesterTimetableHeaders, TimetableHeaders,} from "../service/xlsx.service";
import JSZip from "jszip";
import {FAZData, FAZDayActivity, FAZService} from "../service/faz.service";
import {ResponseMessage, StatusCode} from "./rest.util";
import {FormsService} from "../service/forms.service";

/** The layer where the logic holds */
export class RestService {
    /************************************************************************************
     *                               Visitor only
     ***********************************************************************************/
    static async check(user: User): Promise<void> {
        const row = await UserModel.findOne({
            where: {
                id: user.id,
                identifier: user.identifier,
                email: user.email,
                admin: user.admin,
            }});

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return;
    }

    static async signup(user: User): Promise<void> {
        if (!user.identifier || !user.email || !user.alternativeEmail) {
            throw new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST);
        }

        const options = {
            where: {
                [Op.or]: [
                    {identifier: user.identifier},
                    {email: user.email},
                    {alternativeEmail: user.alternativeEmail},
                ]
            }
        };

        const existingUser = await UserModel.findOne(options);

        if (existingUser !== null) {
            throw new ResponseError(ResponseMessage.DATA_TAKEN, StatusCode.BAD_REQUEST);
        }

        const row = await BaseInformationModel.findOne({
            where: {
                identifier: user.identifier
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_REGISTERED, StatusCode.NOT_ACCEPTABLE);
        }

        user = {...user, admin: false};
        await UserModel.build({...user}).save();

        return;
    }

    static async login(user: User): Promise<void> {
        if (!user.identifier || !user.email) {
            throw new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST);
        }

        const row = await UserModel.findOne({
            where: {
                identifier: user.identifier,
                email: user.email
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.NO_USER_FOUND, StatusCode.NOT_FOUND);
        }

        const realUser = row.toJSON() as User;
        const key = UtilService.generateRandomString(16);

        let dbKey = await UserKeyModel.findOne({
            where: {
                identifier: realUser.identifier
            }
        });

        if (dbKey === null) {
            await UserKeyModel.create({identifier: realUser.identifier, key: key});
        } else {
            await (dbKey.set({key: key}).save());
        }

        await MailService.sendMail({
            from: EmailDefaults.FROM,
            to: [realUser.email].join(','),
            subject: `[Login] ${EmailDefaults.APP_NAME}`,
            html: LoginMessage.getHtml(key),
        });

        return;
    }

    static async authenticate(key: string): Promise<string> {
        const row = await UserKeyModel.findOne({
            where: {
                key: key
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        const user = await UserModel.findOne({
            where: {
                identifier: row.toJSON().identifier
            }
        });

        if (user === null) {
            throw new ResponseError(ResponseMessage.SOMETHING_WRONG, StatusCode.EXPECTATION_FAILED);
        }

        await row.destroy();

        return JwtService.generateAccessToken(user.toJSON() as User);
    }

    /************************************************************************************
     *                               User only
     ***********************************************************************************/
    static async getInformation(user: User): Promise<any> {
        const infoRow = await BaseInformationModel.findOne({
            where: {
                identifier: user.identifier
            }
        });
        const userRow = await UserModel.findOne({
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

    static async getForms(user: User): Promise<any> {
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
    static async getScientificArticleISI(user: User): Promise<any> {
        return (await ScientificArticleISIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleISI(user: User, data: ScientificArticleISI): Promise<void> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificArticleISIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleISI(user: User, formId: number, data: ScientificArticleISI): Promise<void> {
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

    static async deleteScientificArticleISI(user: User, id: number): Promise<void> {
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
    static async getISIProceeding(user: User): Promise<any> {
        return (await ISIProceedingModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addISIProceeding(user: User, data: ISIProceeding): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ISIProceedingModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateISIProceeding(user: User, formId: number, data: ISIProceeding): Promise<void> {
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

    static async deleteISIProceeding(user: User, id: number): Promise<void> {
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
    static async getScientificArticleBDI(user: User): Promise<any> {
        return (await ScientificArticleBDIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleBDI(user: User, data: ScientificArticleBDI): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificArticleBDIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleBDI(user: User, formId: number, data: ScientificArticleBDI): Promise<void> {
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

    static async deleteScientificArticleBDI(user: User, id: number): Promise<void> {
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
    static async getScientificBook(user: User): Promise<any> {
        return (await ScientificBookModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificBook(user: User, data: ScientificBook): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificBookModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificBook(user: User, formId: number, data: ScientificBook): Promise<void> {
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

    static async deleteScientificBook(user: User, id: number): Promise<void> {
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
    static async getTranslation(user: User): Promise<any> {
        return (await TranslationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addTranslation(user: User, data: Translation): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await TranslationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateTranslation(user: User, formId: number, data: Translation): Promise<void> {
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

    static async deleteTranslation(user: User, id: number) {
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
    static async getScientificCommunication(user: User) {
        return (await ScientificCommunicationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificCommunication(user: User, data: ScientificCommunication): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ScientificCommunicationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificCommunication(user: User, formId: number, data: ScientificCommunication) {
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

    static async deleteScientificCommunication(user: User, id: number) {
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
    static async getPatent(user: User) {
        return (await PatentModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addPatent(user: User, data: Patent): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await PatentModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updatePatent(user: User, formId: number, data: Patent) {
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

    static async deletePatent(user: User, id: number) {
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
    static async getResearchContract(user: User) {
        return (await ResearchContractModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addResearchContract(user: User, data: ResearchContract): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await ResearchContractModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateResearchContract(user: User, formId: number, data: ResearchContract) {
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

    static async deleteResearchContract(user: User, id: number) {
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
    static async getCitation(user: User) {
        return (await CitationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addCitation(user: User, data: Citation): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await CitationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateCitation(user: User, formId: number, data: Citation) {
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

    static async deleteCitation(user: User, id: number) {
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
    static async getAwardAndNomination(user: User) {
        return (await AwardAndNominationModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addAwardAndNomination(user: User, data: AwardAndNomination): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await AwardAndNominationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAwardAndNomination(user: User, formId: number, data: AwardAndNomination) {
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

    static async deleteAwardAndNomination(user: User, id: number) {
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
    static async getAcademyMember(user: User) {
        return (await AcademyMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addAcademyMember(user: User, data: AcademyMember): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await AcademyMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAcademyMember(user: User, formId: number, data: AcademyMember) {
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

    static async deleteAcademyMember(user: User, id: number) {
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
    static async getEditorialMember(user: User) {
        return (await EditorialMemberModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addEditorialMember(user: User, data: EditorialMember): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await EditorialMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateEditorialMember(user: User, formId: number, data: EditorialMember) {
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

    static async deleteEditorialMember(user: User, id: number) {
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
    static async getOrganizedEvent(user: User) {
        return (await OrganizedEventModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addOrganizedEvent(user: User, data: OrganizedEvent): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await OrganizedEventModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateOrganizedEvent(user: User, formId: number, data: OrganizedEvent) {
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

    static async deleteOrganizedEvent(user: User, id: number) {
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
    static async getWithoutActivity(user: User) {
        return (await WithoutActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addWithoutActivity(user: User, data: WithoutActivity): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await WithoutActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateWithoutActivity(user: User, formId: number, data: WithoutActivity) {
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

    static async deleteWithoutActivity(user: User, id: number) {
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
    static async getDidacticActivity(user: User) {
        return (await DidacticActivityModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addDidacticActivity(user: User, data: DidacticActivity): Promise<any> {
        if (!UtilService.checkFormFields(data)) {
            throw new ResponseError(ResponseMessage.FORM_FIELD_ERROR, StatusCode.BAD_REQUEST);
        }

        await DidacticActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateDidacticActivity(user: User, formId: number, data: DidacticActivity) {
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

    static async deleteDidacticActivity(user: User, id: number) {
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
    static async allUsers(userExcept: User): Promise<any> {
        const rows = await UserModel.findAll({
            where: {
                id: {[Op.not]: userExcept.id},
            },
            order: ['id'],
        });

        return rows.map(item => item.toJSON());
    }

    static async deleteUser(id: number): Promise<void> {
        const row = await UserModel.findOne({
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
    static async getBaseInformation(user: User) {
        return (await BaseInformationModel.findAll({
            where: {
                identifier: {[Op.not]: user.identifier},
            },
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async importBaseInformation(file: UploadedFile): Promise<number> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        await BaseInformationModel.destroy({where: {}});

        const sheetRows: any = XLSX.utils.sheet_to_json(sheet)

        let rowsCreated = 0;
        for (const item of sheetRows) {
            const obj: BaseInformation = {
                identifier: item[BaseInformationHeaders.IDENTIFIER],
                fullName: item[BaseInformationHeaders.NAME],
                coordinator: item[BaseInformationHeaders.COORDINATOR],
                attendanceYear: item[BaseInformationHeaders.ATTENDANCE_YEAR],
            };

            await BaseInformationModel.create(obj as any);
            rowsCreated++;
        }

        return rowsCreated;
    }

    static async deleteBaseInformation(id: number) {
        const row = await BaseInformationModel.findOne({
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

    static async sendTimetableEmail(emailTemplate: string, subject: string, from: string, file: UploadedFile, recipientExceptList: string[]): Promise<any> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);
        const emailRowsMap = new Map<string, any[]>();

        for (let row of rows) {
            const email = row[SemesterTimetableHeaders.EMAIL];

            const emailRows = emailRowsMap.get(email);

            if (emailRows === undefined) {
                emailRowsMap.set(email, [row]);
                continue;
            }

            emailRows.push(row);
        }

        const emailResults: {email: string, send: boolean}[] = [];

        for (let [email, rows] of emailRowsMap.entries()) {
            if (recipientExceptList.some(item => item === email)) {
                continue;
            }

            let emailActivityContent = '';
            for (let row of rows) {
                const activity = row[SemesterTimetableHeaders.ACTIVITY];
                const weekHours = row[SemesterTimetableHeaders.WEEK_HOURS];

                emailActivityContent += `${activity} ${weekHours} ore/saptamana <br>`;
            }

            const emailContent = emailTemplate.replace(new RegExp(/{{activity}}/g), emailActivityContent);

            /* Sending the email */

            try {
                await MailService.sendMail({
                    from: from,
                    subject: subject,
                    to: email,
                    html: emailContent,
                });

                emailResults.push({email: email, send: true});
            } catch (err) {
                console.log(err);
                emailResults.push({email: email, send: false});
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

    /* Timetable -> Individual Timetable -> Monthly Hours */
    static async faz(timetableFile: UploadedFile, ignoreStart: number, ignoreEnd: number): Promise<any> {
        /* ignoreStart and ignoreEnd are by default -1 if the user doesn't specify a date */

        const timetableWorkBook = XLSX.read(timetableFile.data);
        const timetableSheet = timetableWorkBook.Sheets[timetableWorkBook.SheetNames[0]];

        const timeTablesRows: any[] = XLSX.utils.sheet_to_json(timetableSheet);

        /* This timetable contains a list of rows for evey day of the week  */
        const parsedTimetable: any = {};

        const professorListMap: any = {};

        let lastDay = '';
        for (let row of timeTablesRows) {
            /* This means is a day of the week */
            if (Object.values(row).length === 1) {
                lastDay = row[TimetableHeaders.FROM];
                parsedTimetable[lastDay] = [];
                continue;
            }

            /* Just in case */
            if (lastDay === '') {
                continue;
            }

            let professorName = row[TimetableHeaders.PROFESSOR_NAME];

            if (professorName === undefined || typeof professorName !== "string") {
                console.log('Something went wrong with the row:')
                console.log(row);
                throw new ResponseError(ResponseMessage.INVALID_TIMETABLE, StatusCode.BAD_REQUEST);
            }

            const ratio = 1 / 24;
            /* Here, 13.30 -> 13.50 */
            row[TimetableHeaders.FROM] = parseFloat((row[TimetableHeaders.FROM] / ratio).toFixed(2));
            row[TimetableHeaders.TO] = parseFloat((row[TimetableHeaders.TO] / ratio).toFixed(2));

            professorName = professorName.trim();
            row[TimetableHeaders.PROFESSOR_NAME] = professorName;

            parsedTimetable[lastDay].push(row);
            professorListMap[professorName] = true;
        }

        /* Just all the professors */
        const professorList = Object.keys(professorListMap);

        /* Here, every professor will have it's own timetable */
        const professorsTimetable: any = {};
        for (let professor of professorList) {
            professorsTimetable[professor] = {};

            /* The day is the form [day, rows[]] */
            for (let day of Object.entries(parsedTimetable)) {
                professorsTimetable[professor][day[0]] = (day[1] as any[]).filter(item => item[TimetableHeaders.PROFESSOR_NAME] === professor);
            }
        }

        /* Prepare the zip instance */
        const zip = new JSZip();

        const dayMap: any = {
            0: 'Duminica',
            1: 'Luni',
            2: 'Marti',
            3: 'Miercuri',
            4: 'Joi',
            5: 'Vineri',
            6: 'Sambata',
        }

        /* Get the number of days in the current month, month count, current year
        * in order to loop through all the month days. */
        const currentDate = new Date();
        const monthDays = UtilService.daysInMonth(currentDate); // 1 - First Day
        const currentMonth = currentDate.getMonth(); // January = 0
        const currentYear = currentDate.getFullYear();

        const activityTypes: string[] = [
            'Membru comisie de îndrumare CSRD',
            'Îndrumare teză de doctorat TD',
            'Tehnici fundamentale din domeniul temei de cercetare CAD',
            'Tehnici fundamentale din domeniul temei de cercetare SAD',
            'Metode și metodologii în cercetarea în lnformatica CAD',
            'Metode și metodologii în cercetarea în lnformatica SAD',
            'Tehnici specifice avansate din domeniul temei de cercetare CAD',
            'Tehnici specifice avansate din domeniul temei de cercetare SAD',
            'Etică și lntegritate Academică CAD',
        ];

        /* For every professor the hours will be calculated for the full month */
        for (let professor of professorList) {
            const professorWeek = professorsTimetable[professor];

            /* Loop through each day of the month and see if that professor has something to do */
            const monthlyDays: FAZDayActivity[] = [];
            for (let i = 1; i <= monthDays; i++) {
                if (ignoreStart <= i && i <= ignoreEnd) {
                    continue;
                }

                const day = new Date(currentYear, currentMonth, i).getDay();

                if (day === 0 || day === 6) {
                    continue;
                }

                const dayStr = dayMap[day];
                const dayRows: any[] = professorWeek[dayStr];
                if (dayRows.length !== 0) {
                    /* First activity type day summary */

                    /* Create a map for every activity type in order to separate them */
                    const activityMap: any = {};
                    for (let activity of activityTypes) {
                        activityMap[activity] = {hours: 0, intervals: [], activity: '', activityShort: ''};
                    }

                    for (let item of dayRows) {
                        const activity = item[TimetableHeaders.ACTIVITY_TYPE];
                        const activityShort = item[TimetableHeaders.ACTIVITY_SHORTCUT];

                        const activityFull = `${activity} ${activityShort}`;
                        if (activityMap[activityFull] === undefined) {
                            console.log(`Unrecognized activity type: "${activityFull}". Skipped.`);
                            continue;
                        }

                        const rawFromTime = item[TimetableHeaders.FROM]; // eg. 13.5 aka 13:30
                        const rawToTime = item[TimetableHeaders.TO]; // ex. 14.25 aka 14:15

                        const fromTime = UtilService.excelHourToHourStr(rawFromTime);
                        const toTime = UtilService.excelHourToHourStr(rawToTime);

                        activityMap[activityFull].intervals.push(`${fromTime}-${toTime}`);

                        const rowFAZHours = item[TimetableHeaders.FAZ_HOURS];

                        if (typeof rowFAZHours === 'number') {
                            activityMap[activityFull].hours += rowFAZHours;
                        }

                        activityMap[activityFull].activity = activity;
                        activityMap[activityFull].activityShort = activityShort;
                    }

                    /* Look through all the different activity types day summary and push it to the monthly days list */
                    for (let activityFull of activityTypes) {
                        let hours = activityMap[activityFull].hours;
                        let intervals = activityMap[activityFull].intervals;
                        let activity = activityMap[activityFull].activity;
                        let activityShort = activityMap[activityFull].activityShort;

                        if (hours === 0) {
                            continue;
                        }

                        hours = parseFloat(hours.toFixed(2));

                        let cad = activityShort === 'CAD' ? 'CAD' : '';
                        let sad = activityShort === 'SAD' ? 'SAD' : '';
                        let td = activityShort === 'TD' ? 'TD' : '';
                        let csrd = activityShort === 'CSRD' ? 'CSRD' : '';

                        const fazRow: FAZDayActivity = {
                            day: i, interval: intervals.join(', '), discipline: activity, year: 'I',
                            cad: cad, sad: sad, td: td, csrd: csrd, hours: hours, weekDay: dayStr,
                        };

                        monthlyDays.push(fazRow);
                    }

                }
            }

            const nameItems = professor.split(' ');
            const professorPosition = nameItems.splice(0, 2).join(' ');
            const professorName = nameItems.join(' ');

            const fazProfessorData: FAZData = {
                professorName: professorName,
                professorPosition: professorPosition,
                month: currentMonth,
                year: currentYear,
                monthlyActivity: monthlyDays,
            };

            const docxBuffer = FAZService.getDOCXBuffer(fazProfessorData);

            /* Append the buffer to the zip */
            zip.file(`FAZ ${professor}.docx`, docxBuffer, {compression: 'DEFLATE'});
        }

        /* Get the zip buffer in order to send it */
        return await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' });
    }
}