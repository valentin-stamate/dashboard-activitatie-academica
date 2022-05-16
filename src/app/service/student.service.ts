import {Student} from "../database/models";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel, PatentModel, ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel, ScientificBookModel, ScientificCommunicationModel,
    StudentModel, TranslationModel, WithoutActivityModel
} from "../database/sequelize";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage} from "../services/rest.util";

export class StudentService {

    static async getInformation(user: Student): Promise<Student> {
        const row = await StudentModel.findOne({
            where: {
                id: user.id
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.NO_USER_FOUND);
        }

        const student = row.toJSON();
        delete student.password;

        return student;
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
            scArticleISI, isiProceedings, scArticleBDI, scBook, translation, scCommunication,
            patent, researchContract, citation, awardsNomination, academyMember, editorialMember,
            organizedEvent, withoutActivity, didacticActivity,
        };
    }

}