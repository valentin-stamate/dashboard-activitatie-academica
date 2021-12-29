import {
    AcademyMember,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication, Translation,
    User, UserRelation, WithoutActivity
} from "../models";
import {QueryDB} from "../connection";
import {UserCrudRepository} from "./crud/user.crud.repository";
import {TablesCrudRelationsRepository} from "./crud/tables.crud.relations.repository";

/** An extension to User Repository. Used for CRUD operations.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer. */
export class UserRepository extends UserCrudRepository {

    static async setUserActivationStatus(user: User, status: boolean) {
        const query = "UPDATE users SET activated = $2 WHERE id = $1";

        await QueryDB(query, [user.id, status]);
    }

    static async setUserAdminStatus(user: User, status: boolean) {
        const query = "UPDATE users SET admin = $2 WHERE id = $1";

        await QueryDB(query, [user.id, status]);
    }

    /** Return a user with the given identifier
     * @return a user instance if found, null otherwise */
    static async getUserByIdentifier(identifier: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE identifier = $1";

        const {rows} = await QueryDB(query, [identifier]);

        if (rows.length === 1) {
            return new User(rows[0]);
        }

        return null;
    }

    /** Return a user that matches the mail given.
     * @return a user instance if found, null otherwise */
    static async getUserByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = $1";

        const {rows} = await QueryDB(query, [email]);

        if (rows.length === 1) {
            return new User(rows[0]);
        }

        return null;
    }

    /* Informații */
    static async getUserInformation(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_information ui ON u.id = ui.user_id
                       JOIN information r ON r.id = ui.relation_id`

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new Information(rows[0]);
    }

    static async removeUserInformation(user: User, table: Information) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserInformation(relation);
    }

    /* Articole ştiintifice publicate în extenso...(ISI) */
    static async getUserScientificArticlesISI(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_article_isi ur ON u.id = ur.user_id
                       JOIN scientific_article_isi r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ScientificArticleISI(rows[0]);
    }

    static async removeUserScientificArticleISI(user: User, table: ScientificArticleISI) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserScientificArticleISI(relation);
    }

    /* ISI proceedings */
    static async getUserISIProceedings(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_isi_proceedings ur ON u.id = ur.user_id
                       JOIN isi_proceedings r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ISIProceeding(rows[0]);
    }

    static async removeUserISIProceedings(user: User, table: ISIProceeding) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        }

        await TablesCrudRelationsRepository.deleteUserISIProceeding(relation);
    }

    /* Articole științifice publicate în extenso... (BDI) */
    static async getUserScientificArticlesBDI(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_articles_bdi ur ON u.id = ur.user_id
                       JOIN scientific_articles_bdi r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ScientificArticleBDI(rows[0]);
    }

    static async removeUserScientificArticleBDI(user: User, table: ScientificArticleBDI) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserScientificArticleBDI(relation);
    }

    /* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
    static async getUserScientificBooks(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_books ur ON u.id = ur.user_id
                       JOIN scientific_books r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ScientificBook(rows[0]);
    }

    static async removeUserScientificBook(user: User, table: ScientificBook) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserScientificBook(relation);
    }

    /* Traduceri */
    static async getUserTranslations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_translations ur ON u.id = ur.user_id
                       JOIN translations r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new Translation(rows[0]);
    }

    static async removeUserTranslation(user: User, table: Translation) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserTranslation(relation);
    }

    /* Comunicări în manifestări științifice */
    static async getUserScientificCommunications(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_communications ur ON u.id = ur.user_id
                       JOIN scientific_communications r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ScientificCommunication(rows[0]);
    }

    static async removeUserScientificCommunication(user: User, table: ScientificCommunication) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserScientificCommunication(relation);
    }

    /* Brevete */
    static async getUserPatents(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_patents ur ON u.id = ur.user_id
                       JOIN patents r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new Patent(rows[0]);
    }

    static async removeUserPatent(user: User, table: Patent) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserPatent(relation);
    }

    /* Contracte de cercetare */
    static async getUserResearchContracts(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_research_contracts ur ON u.id = ur.user_id
                       JOIN research_contracts r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new ResearchContract(rows[0]);
    }

    static async removeUserResearchContract(user: User, table: ResearchContract) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserResearchContract(relation);
    }

    /* Citări */
    static async getUserCitations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_citations ur ON u.id = ur.user_id
                       JOIN citations r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new Citation(rows[0]);
    }

    static async removeUserCitation(user: User, table: Citation) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserCitation(relation);
    }

    /* Premii si nominalizari */
    static async getUserAwardsAndNominations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_awards_and_nominations ur ON u.id = ur.user_id
                       JOIN awards_and_nominations r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new AwardAndNomination(rows[0]);
    }

    static async removeUserAwardAndNomination(user: User, table: AwardAndNomination) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserAwardAndNomination(relation);
    }

    /* Membru în academii */
    static async getUserAcademyMembers(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_academy_member ur ON u.id = ur.user_id
                       JOIN academy_member r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new AcademyMember(rows[0]);
    }

    static async removeUserAcademyMember(user: User, table: AcademyMember) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserAcademyMember(relation);
    }

    /* Membru în echipa editorială */
    static async getUserEditorialMembers(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_editorial_member ur ON u.id = ur.user_id
                       JOIN editorial_member r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new EditorialMember(rows[0]);
    }

    static async removeUserEditorialMember(user: User, table: EditorialMember) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserEditorialMember(relation);
    }

    /* Evenimente organizate */
    static async getUserOrganizedEvents(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_organized_events ur ON u.id = ur.user_id
                       JOIN organized_events r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new OrganizedEvent(rows[0]);
    }

    static async removeUserOrganizedEvent(user: User, table: OrganizedEvent) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserOrganizedEvent(relation);
    }

    /* Fără activitate științifică */
    static async getUserWithoutActivity(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_without_activity ur ON u.id = ur.user_id
                       JOIN without_activity r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new WithoutActivity(rows[0]);
    }

    static async removeUserWithoutActivity(user: User, table: WithoutActivity) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserWithoutActivity(relation);
    }

    /* Activitate didactică */
    static async getUserDidacticActivity(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = 1) u
                       JOIN user_didactic_activity ur ON u.id = ur.user_id
                       JOIN didactic_activity r ON ur.relation_id = r.id`;

        const {rows} = await QueryDB(query, [user.id]);

        if (rows.length === 0) {
            return null;
        }

        return new DidacticActivity(rows[0]);
    }

    static async removeUserDidacticActivity(user: User, table: DidacticActivity) {
        const relation: UserRelation = {
            userId: user.id,
            relationId: table.id,
        };

        await TablesCrudRelationsRepository.deleteUserDidacticActivity(relation);
    }


}