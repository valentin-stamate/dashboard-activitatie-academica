import {
    AcademyMember, AcademyMemberSheet,
    AwardAndNomination, AwardAndNominationSheet,
    Citation, CitationSheet,
    DidacticActivity, DidacticActivitySheet,
    EditorialMember, EditorialMemberSheet,
    ISIProceeding,
    ISIProceedingSheet,
    OrganizedEvent, OrganizedEventSheet,
    Patent, PatentSheet,
    ResearchContract, ResearchContractSheet,
    ScientificArticleBDI,
    ScientificArticleBDISheet,
    ScientificArticleISI,
    ScientificArticleISISheet,
    ScientificBook,
    ScientificBookSheet,
    ScientificCommunication,
    ScientificCommunicationSheet,
    Translation,
    TranslationSheet,
    User,
    WithoutActivity, WithoutActivitySheet
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
    ProfessorModel,
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
import XLSX, {WorkBook, WorkSheet} from "xlsx";
import {UtilService} from "../service/util.service";
import {EmailDefaults, EmailTemplates, MailOptions, MailService} from "../service/email.service";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {Op} from "@sequelize/core";
import {XLSXKeys, XLSXWorkBookService, XLSXWorkSheetService} from "../service/xlsx.service";
import JSZip from "jszip";
import fs from "fs";

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

        await MailService.sendMail(new MailOptions(
            EmailDefaults.FROM,
            [realUser.email],
            [],
            [],
            '[Login] ' + EmailDefaults.PARTIAL_SUBJECT,
            '',
            EmailTemplates.LOGIN,
            [key],
            ));

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

        if (infoRow === null || userRow === null) {
            return {};
        }

        return {...infoRow.toJSON(), ...userRow.toJSON()};
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
    static async getScientificArticleISI(user: User) {
        return (await ScientificArticleISIModel.findAll({
            where: {owner: user.identifier},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleISI(user: User, data: ScientificArticleISI): Promise<void> {
        await ScientificArticleISIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleISI(user: User, formId: number, data: ScientificArticleISI): Promise<void> {
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

    static async addISIProceeding(user: User, data: ISIProceeding) {
        await ISIProceedingModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateISIProceeding(user: User, formId: number, data: ISIProceeding): Promise<void> {
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

    static async addScientificArticleBDI(user: User, data: ScientificArticleBDI) {
        await ScientificArticleBDIModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificArticleBDI(user: User, formId: number, data: ScientificArticleBDI): Promise<void> {
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

    static async addScientificBook(user: User, data: ScientificBook) {
        await ScientificBookModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificBook(user: User, formId: number, data: ScientificBook): Promise<void> {
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

    static async addTranslation(user: User, data: Translation) {
        await TranslationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateTranslation(user: User, formId: number, data: Translation): Promise<void> {
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

    static async addScientificCommunication(user: User, data: ScientificCommunication) {
        await ScientificCommunicationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateScientificCommunication(user: User, formId: number, data: ScientificCommunication) {
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

    static async addPatent(user: User, data: Patent) {
        await PatentModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updatePatent(user: User, formId: number, data: Patent) {
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

    static async addResearchContract(user: User, data: ResearchContract) {
        await ResearchContractModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateResearchContract(user: User, formId: number, data: ResearchContract) {
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

    static async addCitation(user: User, data: Citation) {
        await CitationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateCitation(user: User, formId: number, data: Citation) {
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

    static async addAwardAndNomination(user: User, data: AwardAndNomination) {
        await AwardAndNominationModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAwardAndNomination(user: User, formId: number, data: AwardAndNomination) {
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

    static async addAcademyMember(user: User, data: AcademyMember) {
        await AcademyMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateAcademyMember(user: User, formId: number, data: AcademyMember) {
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

    static async addEditorialMember(user: User, data: EditorialMember) {
        await EditorialMemberModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateEditorialMember(user: User, formId: number, data: EditorialMember) {
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

    static async addOrganizedEvent(user: User, data: OrganizedEvent) {
        await OrganizedEventModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateOrganizedEvent(user: User, formId: number, data: OrganizedEvent) {
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

    static async addWithoutActivity(user: User, data: WithoutActivity) {
        await WithoutActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateWithoutActivity(user: User, formId: number, data: WithoutActivity) {
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

    static async addDidacticActivity(user: User, data: DidacticActivity) {
        await DidacticActivityModel.create({
            ...data,
            owner: user.identifier
        });
        return;
    }

    static async updateDidacticActivity(user: User, formId: number, data: DidacticActivity) {
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
    static async allUsers(userExcept: User): Promise<any> {
        const rows = await UserModel.findAll({
            where: {
                id: {[Op.not]: userExcept.id},
            }
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

    static async getBaseInformation() {
        return (await BaseInformationModel.findAll({order: ['id']}))
            .map(item => item.toJSON());
    }

    static async importBaseInformation(file: UploadedFile): Promise<void> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        await BaseInformationModel.destroy({where: {}});

        const sheetRows: any = XLSX.utils.sheet_to_json(sheet)

        for (const item of sheetRows) {
            const obj = {
                fullName: item[XLSXKeys.NAME],
                identifier: item[XLSXKeys.IDENTIFIER],
                coordinator: item[XLSXKeys.COORDINATOR],
                founding: item[XLSXKeys.FUNDING],
            };

            await BaseInformationModel.create(obj);
        }

        return;
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

    static async sendOrganizationEmail(htmlEmail: string, subject: string, from: string, file: UploadedFile): Promise<any> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);
        const emailRowsMap: Map<string, any[]> = new Map();

        const headers = Object.keys(rows[0]);

        for (let row of rows) {
            const rowMap: Map<string, any> = new Map(Object.entries(row));
            const email = rowMap.get(XLSXKeys.EMAIL);

            const emailRows = emailRowsMap.get(email);
            if (emailRows === undefined) {
                emailRowsMap.set(email, [row]);
                continue;
            }

            emailRows.push(row);
        }

        const emailResults: {email: string, send: boolean}[] = [];

        for (const [email, rows] of emailRowsMap.entries()) {
            if (email === undefined) {
                throw new ResponseError(ResponseMessage.ALL_EMAILS_SHOULD_BE_PRESENT, StatusCode.NOT_FOUND);
            }

            const sheet: WorkSheet = XLSX.utils.aoa_to_sheet([
                headers
            ]);

            XLSX.utils.sheet_add_aoa(sheet, rows.map(item => Object.values(item)), {origin: -1});

            const workBook: WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, sheet);

            const buffer: Buffer = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});

            const dateStr = UtilService.stringDate(new Date());

            try {
                await MailService.sendMail(new MailOptions(from, [email], [], [], subject, htmlEmail,
                    htmlEmail, [], [{content: buffer, filename: `organizare_${dateStr}.xlsx`}]

                ));
                emailResults.push({
                    email: email,
                    send: true,
                });
            } catch (e) {
                console.log(`Mail Error: ${email}`);
                console.log(e);
                emailResults.push({
                    email: email,
                    send: false,
                });
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

        scArticleISI = scArticleISI.map(item => {delete item.id; return item});
        isiProceedings = isiProceedings.map(item => {delete item.id; return item});
        scArticleBDI = scArticleBDI.map(item => {delete item.id; return item});
        scBook = scBook.map(item => {delete item.id; return item});
        translation = translation.map(item => {delete item.id; return item});
        scCommunication = scCommunication.map(item => {delete item.id; return item});
        patent = patent.map(item => {delete item.id; return item});
        researchContract = researchContract.map(item => {delete item.id; return item});
        citation = citation.map(item => {delete item.id; return item});
        awardsNomination = awardsNomination.map(item => {delete item.id; return item});
        academyMember = academyMember.map(item => {delete item.id; return item});
        editorialMember = editorialMember.map(item => {delete item.id; return item});
        organizedEvent = organizedEvent.map(item => {delete item.id; return item});
        withoutActivity = withoutActivity.map(item => {delete item.id; return item});
        didacticActivity = didacticActivity.map(item => {delete item.id; return item});

        const scISISheet = new XLSXWorkSheetService(ScientificArticleISISheet.header, ScientificArticleISISheet.sheetName, scArticleISI);
        const isiProceedingsSheet = new XLSXWorkSheetService(ISIProceedingSheet.header, ISIProceedingSheet.sheetName, isiProceedings);
        const scArticleBDISheet = new XLSXWorkSheetService(ScientificArticleBDISheet.header, ScientificArticleBDISheet.sheetName, scArticleBDI);
        const scBookSheet = new XLSXWorkSheetService(ScientificBookSheet.header, ScientificBookSheet.sheetName, scBook);
        const translationSheet = new XLSXWorkSheetService(TranslationSheet.header, TranslationSheet.sheetName, translation);
        const scCommunicationSheet = new XLSXWorkSheetService(ScientificCommunicationSheet.header, ScientificCommunicationSheet.sheetName, scCommunication);
        const patentSheet = new XLSXWorkSheetService(PatentSheet.header, PatentSheet.sheetName, patent);
        const researchContractSheet = new XLSXWorkSheetService(ResearchContractSheet.header, ResearchContractSheet.sheetName, researchContract);
        const citationSheet = new XLSXWorkSheetService(CitationSheet.header, CitationSheet.sheetName, citation);
        const awardsNominationSheet = new XLSXWorkSheetService(AwardAndNominationSheet.header, AwardAndNominationSheet.sheetName, awardsNomination);
        const academyMemberSheet = new XLSXWorkSheetService(AcademyMemberSheet.header, AcademyMemberSheet.sheetName, academyMember);
        const editorialMemberSheet = new XLSXWorkSheetService(EditorialMemberSheet.header, EditorialMemberSheet.sheetName, editorialMember);
        const organizedEventSheet = new XLSXWorkSheetService(OrganizedEventSheet.header, OrganizedEventSheet.sheetName, organizedEvent);
        const withoutActivitySheet = new XLSXWorkSheetService(WithoutActivitySheet.header, WithoutActivitySheet.sheetName, withoutActivity);
        const didacticActivitySheet = new XLSXWorkSheetService(DidacticActivitySheet.header, DidacticActivitySheet.sheetName, didacticActivity);

        const sheets: XLSXWorkSheetService[] = [
            scISISheet, isiProceedingsSheet, scArticleBDISheet, scBookSheet, translationSheet, scCommunicationSheet, patentSheet, researchContractSheet,
            citationSheet, awardsNominationSheet, academyMemberSheet, editorialMemberSheet, organizedEventSheet, withoutActivitySheet, didacticActivitySheet
        ];

        const sheetBook = new XLSXWorkBookService();
        sheetBook.appendSheets(sheets);

        const workBook: WorkBook = sheetBook.getInstance();
        const buffer = new Buffer(XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'}));
        return buffer;
    }

    static async getProfessors() {
        return (await ProfessorModel.findAll()).map(item => item.toJSON());
    }

    static async refreshProfessors(file: UploadedFile): Promise<void> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        await ProfessorModel.destroy({where: {}});

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        for (let row of rows) {
            await ProfessorModel.create({name: row[XLSXKeys.NAME]});
        }

        return;
    }

    /* Timetable -> Individual Timetable -> Monthly Hours */
    static async faz(timetableFile: UploadedFile): Promise<any> {
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
                lastDay = row[XLSXKeys.FROM];
                parsedTimetable[lastDay] = [];
                continue;
            }

            /* Just in case */
            if (lastDay === '') {
                continue;
            }

            let professorName = row[XLSXKeys.PROFESSOR_NAME];

            if (professorName === undefined || typeof professorName !== "string") {
                console.log('Something went wrong with row:')
                console.log(row);
                throw new ResponseError(ResponseMessage.INVALID_TIMETABLE, StatusCode.BAD_REQUEST);
            }

            const ratio = 1 / 24;
            /* Here, 13.30 -> 13.50 */
            row[XLSXKeys.FROM] = parseFloat((row[XLSXKeys.FROM] / ratio).toFixed(2));
            row[XLSXKeys.TO] = parseFloat((row[XLSXKeys.TO] / ratio).toFixed(2));

            professorName = professorName.trim();
            row[XLSXKeys.PROFESSOR_NAME] = professorName;

            parsedTimetable[lastDay].push(row);
            professorListMap[professorName] = true;
        }

        /* Just all the professors */
        const professorList = Object.keys(professorListMap);

        /* Here, every professor will have it's own timetable */
        const professorsTimetable: any = {};
        for (let professor of professorList) {
            professorsTimetable[professor] = {};

            for (let day of Object.entries(parsedTimetable)) {
                professorsTimetable[professor][day[0]] = (day[1] as any[]).filter(item => item[XLSXKeys.PROFESSOR_NAME] === professor);
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

        /* For every professor the hours will be calculated for the full month */
        for (let professor of professorList) {
            const professorWeek = professorsTimetable[professor];

            /* Loop through each day of the month and see if that professor has something to do */
            const monthlyHours: any[] = [];
            for (let i = 1; i <= monthDays; i++) {
                const day = new Date(currentYear, currentMonth, i).getDay();

                if (day === 0 || day === 6) {
                    continue;
                }

                const dayStr = dayMap[day];
                const dayRows: any[] = professorWeek[dayStr];
                if (dayRows.length !== 0) {
                    let totalDayMinutes = 0;

                    for (let item of dayRows) {
                        const fromTime = item[XLSXKeys.FROM];
                        const toTime = item[XLSXKeys.TO];
                        totalDayMinutes += (toTime - fromTime) * 60;
                    }

                    const hours = totalDayMinutes / 60;
                    monthlyHours.push({'Data': i, 'Ziua': dayStr, 'Ore': hours});
                }
            }

            const sheet = XLSX.utils.json_to_sheet(monthlyHours);
            const workBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, sheet);

            const excelBuffer = new Buffer(XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'}));

            /* Append the buffer to the zip */
            zip.file(`${professor}.xlsx`, excelBuffer, {compression: 'DEFLATE'});
        }

        /* Get the zip buffer in order to send it */
        const zipBuffer = await zip.generateAsync( { type : "nodebuffer", compression: 'DEFLATE' } );

        /* Just for testing */
        const fs = require('fs');
        fs.writeFile( 'test.zip', zipBuffer, function( err: any ){
            console.log(err);
        } );

        return zipBuffer;
    }
}

export enum ResponseMessage {
    SUCCESS = 'Success',

    INCOMPLETE_FORM = 'Please complete all the fields',
    USER_NOT_REGISTERED = 'The user is not registered in our database',
    NO_USER_FOUND = 'No user was found with these credentials',
    INVALID_AUTH_KEY = 'The authorization key provided is invalid',
    SOMETHING_WRONG = 'Something went wrong',
    NO_AUTH_TOKEN = 'There is no authentication key available',
    INVALID_TOKEN = 'Invalid token',
    USER_NOT_EXISTS = 'Valid token, but user doesn\'t exist',
    ADMIN_ONLY = 'Unauthorized, admin permission only',
    DATA_NOT_FOUND = 'Data not found',
    DATA_TAKEN = 'Some data is already taken',
    ALL_EMAILS_SHOULD_BE_PRESENT = 'All emails should be completed in the column',
    INVALID_TIMETABLE = 'Invalid timetable',
    NO_KEY = 'There is no key present',
}

/** Contains the request responses */
export enum StatusCode {
    /** Informational */
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    /** SUCCESS = 2×× */
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,

    /** REDIRECTION = 3×× */
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    /** CLIENT ERROR = 4×× */
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    CLIENT_CLOSED_REQUEST = 499,

    /**  SERVER ERROR = 5×× */
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}