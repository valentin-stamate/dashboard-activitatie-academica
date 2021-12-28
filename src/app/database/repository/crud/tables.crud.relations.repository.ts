import {UserRelation} from "../../models";
import {QueryDB} from "../../connection";

/** CRUD repository. Handles the relations between user and the tables
 * associated with it. */
abstract class TablesCrudRelationsRepository {

    /* ----==== Informații ====---- */

    /** User - Information - ALL */
    static async allUserInformation(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = 'SELECT * FROM user_information';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Information - CREATE */
    static async addUserInformation(payload: UserRelation) {
        const query = `INSERT INTO user_information(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Information - DELETE */
    static async deleteUserInformation(payload: UserRelation) {
        const query = `DELETE FROM user_information WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Articole ştiintifice publicate în extenso...(ISI) ====---- */

    /** User - Scientific Articles ISI - ALL */
    static async allUserScientificArticlesISI(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = 'SELECT * FROM user_scientific_article_isi';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Scientific Articles ISI - CREATE */
    static async addUserScientificArticleISI(payload: UserRelation) {
        const query = `INSERT INTO user_scientific_article_isi (user_id, relation_id) 
                       VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Scientific Articles ISI - DELETE */
    static async deleteUserScientificArticleISI(payload: UserRelation) {
        const query = `DELETE FROM user_scientific_article_isi WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== ISI proceedings ====---- */

    /** User - ISI Proceedings - ALL */
    static async allUserISIProceedings(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = 'SELECT * FROM user_isi_proceedings';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - ISI Proceedings - CREATE */
    static async addUserISIProceeding(payload: UserRelation) {
        const query = `INSERT INTO user_isi_proceedings(user_id, relation_id)
                       VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - ISI Proceedings - DELETE */
    static async deleteUserISIProceeding(payload: UserRelation) {
        const query = `DELETE FROM user_isi_proceedings WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Articole științifice publicate în extenso... (BDI) ====---- */

    /** User - Scientific Articles BDI - ALL */
    static async allUserScientificArticlesBDI(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_scientific_articles_bdi`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Scientific Articles BDI - CREATE */
    static async addUserScientificArticleBDI(payload: UserRelation) {
        const query = `INSERT INTO user_scientific_articles_bdi
                       (user_id, relation_id)
                       VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Scientific Articles BDI - DELETE */
    static async deleteUserScientificArticleBDI(payload: UserRelation) {
        const query = `DELETE FROM user_scientific_articles_bdi WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Cărţi ştiinţifice sau capitole de cărți publicate în edituri ====---- */

    /** User - Scientific Books - ALL */
    static async allUserScientificBooks(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_scientific_books`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Scientific Books - CREATE */
    static async addUserScientificBook(payload: UserRelation) {
        const query = `INSERT INTO user_scientific_books(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Scientific Books - DELETE */
    static async deleteUserScientificBook(payload: UserRelation) {
        const query = `DELETE FROM user_scientific_books WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Traduceri ====---- */

    /** User - Translations - ALL */
    static async allUserTranslations(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_translations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Translations - CREATE */
    static async addUserTranslation(payload: UserRelation) {
        const query = `INSERT INTO user_translations (user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Translations - DELETE */
    static async deleteUserTranslation(payload: UserRelation) {
        const query = `DELETE FROM user_translations WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Comunicări în manifestări științifice ====---- */

    /** User - Scientific communications - ALL */
    static async allUserScientificCommunications(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_scientific_communications`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Scientific communications - CREATE */
    static async addUserScientificCommunication(payload: UserRelation) {
        const query = `INSERT INTO user_scientific_communications (user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Scientific communications - DELETE */
    static async deleteUserScientificCommunication(payload: UserRelation) {
        const query = `DELETE FROM user_scientific_communications WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Brevete ====---- */

    /** User - Patents - ALL */
    static async allUserPatents(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_patents`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Patents - CREATE */
    static async addUserPatent(payload: UserRelation) {
        const query = `INSERT INTO user_patents (user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Patents - DELETE */
    static async deleteUserPatent(payload: UserRelation) {
        const query = `DELETE FROM user_patents WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Contracte de cercetare ====---- */

    /** User - Research contracts - ALL */
    static async allUserResearchContracts(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_research_contracts`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Research contracts - CREATE */
    static async addUserResearchContract(payload: UserRelation) {
        const query = `INSERT INTO user_research_contracts (user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Research contracts - DELETE */
    static async deleteUserResearchContract(payload: UserRelation) {
        const query = `DELETE FROM user_research_contracts WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Citări ====---- */

    /** User - Citations - ALL */
    static async allUserCitations(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_citations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Citations - CREATE */
    static async addUserCitation(payload: UserRelation) {
        const query = `INSERT INTO user_citations(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Citations - DELETE */
    static async deleteUserCitation(payload: UserRelation) {
        const query = `DELETE FROM user_citations WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Premii si nominalizari ====---- */

    /** User - Awards and nominations - ALL */
    static async allUserAwardAndNominations(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_awards_and_nominations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Awards and nominations - CREATE */
    static async addUserAwardAndNomination(payload: UserRelation) {
        const query = `INSERT INTO user_awards_and_nominations(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Awards and nominations - DELETE */
    static async deleteUserAwardAndNomination(payload: UserRelation) {
        const query = `DELETE FROM user_awards_and_nominations WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Membru în academii ====---- */

    /** User - Academy member - ALL */
    static async allUserAcademyMembers(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_academy_member`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Academy member - CREATE */
    static async addUserAcademyMember(payload: UserRelation) {
        const query = `INSERT INTO user_academy_member(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Academy member - DELETE */
    static async deleteUserAcademyMember(payload: UserRelation) {
        const query = `DELETE FROM user_academy_member WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Membru în echipa editorială ====---- */

    /** User - Editorial member - ALL */
    static async allUserEditorialMember(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_editorial_member`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Editorial member - CREATE */
    static async addUserEditorialMembers(payload: UserRelation) {
        const query = `INSERT INTO user_editorial_member(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Editorial member - DELETE */
    static async deleteUserEditorialMember(payload: UserRelation) {
        const query = `DELETE FROM user_editorial_member WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Evenimente organizate ====---- */

    /** User - Organized events - ALL */
    static async allUserOrganizedEvents(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_organized_events`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Organized events - CREATE */
    static async addUserOrganizedEvent(payload: UserRelation) {
        const query = `INSERT INTO user_organized_events(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Organized events - DELETE */
    static async deleteUserOrganizedEvent(payload: UserRelation) {
        const query = `DELETE FROM user_organized_events WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Fără activitate științifică ====---- */

    /** User - Without activity - ALL */
    static async allUserWithoutActivities(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_without_activity`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Without activity - CREATE */
    static async addUserWithoutActivity(payload: UserRelation) {
        const query = `INSERT INTO user_without_activity(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Without activity - DELETE */
    static async deleteUserWithoutActivity(payload: UserRelation) {
        const query = `DELETE FROM user_without_activity WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

    /* ----==== Activitate didactică ====---- */

    /** User - Didactic activity - ALL */
    static async allUserDidacticActivities(): Promise<UserRelation[]> {
        const list: UserRelation[] = [];
        const query = `SELECT * FROM user_didactic_activity`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new UserRelation(row));
        }

        return list;
    }

    /** User - Didactic activity - CREATE */
    static async addUserDidacticActivity(payload: UserRelation) {
        const query = `INSERT INTO user_didactic_activity(user_id, relation_id) VALUES ($1, $2)`;

        const params = [payload.userId, payload.relationId];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** User - Didactic activity - DELETE */
    static async deleteUserDidacticActivity(payload: UserRelation) {
        const query = `DELETE FROM user_didactic_activity WHERE user_id = $1`;

        try {
            await QueryDB(query, [payload.userId]);
        } catch (e) {
            throw e;
        }
    }

}