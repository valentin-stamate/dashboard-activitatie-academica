import {Student} from "../database/models";
import {
    AcademyMember,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication,
    Translation, WithoutActivity
} from "../database/form.models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel,
    ScientificBookModel, ScientificCommunicationModel, TranslationModel, WithoutActivityModel
} from "../database/sequelize";
import {UtilService} from "../services/util.service";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";

export class StudentFormService {

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

}