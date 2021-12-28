import {
    AcademyMember,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    ErrorResponse,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication, Translation,
    User, WithoutActivity
} from "../models";
import {QueryDB} from "../connection";
import {UserCrudRepository} from "./crud/user.crud.repository";

/** User repository. Used for CRUD operations. */
export class UserRepository extends UserCrudRepository {

    static async setsUserActivationStatus(user: User, status: boolean) {
        const query = "UPDATE users SET activated = $2 WHERE id = $1";

        try {
            await QueryDB(query, [user.id, status]);
        } catch (e) {
            console.log(e);

            return false;
        }

        return true;
    }

    static async setUserAdminStatus(user: User, status: boolean) {
        const query = "UPDATE users SET admin = $2 WHERE id = $1";

        try {
            await QueryDB(query, [user.id, status]);
        } catch (e) {
            console.log(e);

            return false;
        }

        return true;
    }

    /** Return a user with the given identifier
     * @return a user instance if found, null otherwise */
    static async getUserByIdentifier(identifier: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE identifier = $1";

        try {
            const {rows} = await QueryDB(query, [identifier]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    /** Return a user that matches the mail given.
     * @return a user instance if found, null otherwise */
    static async getUserByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = $1";

        try {
            const {rows} = await QueryDB(query, [email]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    /* Informații */
    static async getUserInformation(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_information ui ON u.id = ui.user_id
                       JOIN information r ON r.id = ui.relation_id`

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new Information(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Articole ştiintifice publicate în extenso...(ISI) */
    static async getUserScientificArticlesISI(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_article_isi ur ON u.id = ur.user_id
                       JOIN scientific_article_isi r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ScientificArticleISI(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* ISI proceedings */
    static async getUserISIProceedings(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_isi_proceedings ur ON u.id = ur.user_id
                       JOIN isi_proceedings r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ISIProceeding(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Articole științifice publicate în extenso... (BDI) */
    static async getUserScientificArticlesBDI(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_articles_bdi ur ON u.id = ur.user_id
                       JOIN scientific_articles_bdi r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ScientificArticleBDI(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
    static async getUserScientificBooks(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_books ur ON u.id = ur.user_id
                       JOIN scientific_books r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ScientificBook(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Traduceri */
    static async getUserTranslations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_translations ur ON u.id = ur.user_id
                       JOIN translations r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new Translation(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Comunicări în manifestări științifice */
    static async getUserScientificCommunications(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_scientific_communications ur ON u.id = ur.user_id
                       JOIN scientific_communications r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ScientificCommunication(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Brevete */
    static async getUserPatents(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_patents ur ON u.id = ur.user_id
                       JOIN patents r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new Patent(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Contracte de cercetare */
    static async getUserResearchContracts(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_research_contracts ur ON u.id = ur.user_id
                       JOIN research_contracts r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new ResearchContract(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Citări */
    static async getUserCitations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_citations ur ON u.id = ur.user_id
                       JOIN citations r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new Citation(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Premii si nominalizari */
    static async getUserAwardsAndNominations(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_awards_and_nominations ur ON u.id = ur.user_id
                       JOIN awards_and_nominations r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new AwardAndNomination(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Membru în academii */
    static async getUserAcademyMembers(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_academy_member ur ON u.id = ur.user_id
                       JOIN academy_member r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new AcademyMember(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Membru în echipa editorială */
    static async getUserEditorialMembers(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_editorial_member ur ON u.id = ur.user_id
                       JOIN editorial_member r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new EditorialMember(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Evenimente organizate */
    static async getUserOrganizedEvents(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_organized_events ur ON u.id = ur.user_id
                       JOIN organized_events r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new OrganizedEvent(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Fără activitate științifică */
    static async getUserWithoutActivity(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_without_activity ur ON u.id = ur.user_id
                       JOIN without_activity r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new WithoutActivity(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Activitate didactică */
    static async getUserDidacticActivity(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = 1) u
                       JOIN user_didactic_activity ur ON u.id = ur.user_id
                       JOIN didactic_activity r ON ur.relation_id = r.id`;

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new DidacticActivity(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }


}