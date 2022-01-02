import {TablesCrudRepository} from "./crud/tables.crud.repository";
import {
    AcademyMember, Activation, Authentication,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication,
    Translation,
    User, WithoutActivity
} from "../models";
import {QueryDB} from "../connection";

/** An extension to TablesCrudRepository.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer.*/
export class TablesRepository extends TablesCrudRepository {

    /* Autentificare */
    static async deleteAuthenticationByUser(userId: number) {
        const query = `DELETE FROM authentication WHERE user_id = $1`;
        const params = [userId];

        await QueryDB(query, params);
    }

    static async getAuthenticationByUser(userId: number): Promise<Authentication[]> {
        const query = `SELECT * FROM authentication WHERE user_id = $1`;
        const params = [userId];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    static async getAuthenticationByKey(key: string): Promise<Authentication[]> {
        const query = `SELECT * FROM authentication WHERE auth_key = $1`;
        const params = [key];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    /* Activare */
    static async deleteActivationByUser(userId: number) {
        const query = `DELETE FROM activation WHERE user_id = $1`;
        const params = [userId];

        await QueryDB(query, params);
    }

    static async getActivationByUser(userId: number): Promise<Activation[]> {
        const query = `SELECT * FROM activation WHERE user_id = $1`;
        const params = [userId];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

    static async getActivationByKey(key: string): Promise<Activation[]> {
        const query = `SELECT * FROM activation WHERE activation_key = $1`;
        const params = [key];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

    /* Informații */
    static async deleteInformationByUser(userId: number) {
      const query = `DELETE FROM information WHERE owner = $1 RETURNING *`;

      const {rows} = await QueryDB(query, [userId]);
      return rows;
    }

    static async getInformationByUser(userId: number): Promise<Information[]> {
        const query = `SELECT * FROM information WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }
    
    static async addOrUpdateInformation(data: Information) {
        const rows = await this.getInformationByUser(data.owner);

        if (rows.length === 0) {
            await this.addInformation(data);
            return;
        }

        await this.updateInformation(data);
    }

    /* Articole științifice publicate în extenso...(ISI) */
    static async deleteScientificArticleISIByUser(userId: number) {
        const query = `DELETE FROM scientific_article_isi WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getScientificArticleISIByUser(userId: number): Promise<ScientificArticleISI[]> {
        const query = `SELECT * FROM scientific_article_isi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    static async addOrUpdateScientificArticleISI(data: ScientificArticleISI) {
        const rows = await this.getScientificArticleISIByUser(data.owner);

        if (rows.length === 0) {
            await this.addScientificArticleISI(data);
            return;
        }

        await this.updateScientificArticleISI(data);
    }

    /* ISI proceedings */
    static async deleteISIProceedingByUser(userId: number) {
        const query = `DELETE FROM isi_proceedings WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getISIProceedingByUser(userId: number): Promise<ISIProceeding[]> {
        const query = `SELECT * FROM isi_proceedings WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    static async addOrUpdateISIProceeding(data: ISIProceeding) {
        const rows = await this.getISIProceedingByUser(data.owner);

        if (rows.length === 0) {
            await this.addISIProceeding(data);
            return;
        }

        await this.updateISIProceeding(data);
    }

    /* Articole științifice publicate în extenso... (BDI) */
    static async deleteScientificArticleBDIByUser(userId: number) {
        const query = `DELETE FROM scientific_articles_bdi WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getScientificArticleBDIByUser(userId: number): Promise<ScientificArticleBDI[]> {
        const query = `SELECT * FROM scientific_articles_bdi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    static async addOrUpdateScientificArticleBDI(data: ScientificArticleBDI) {
        const rows = await this.getScientificArticleBDIByUser(data.owner);

        if (rows.length === 0) {
            await this.addScientificArticleBDI(data);
            return;
        }

        await this.updateScientificArticleBDI(data);
    }

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async deleteScientificBookByUser(userId: number) {
        const query = `DELETE FROM scientific_books WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getScientificBookByUser(userId: number): Promise<ScientificBook[]> {
        const query = `SELECT * FROM scientific_books WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    static async addOrUpdateScientificBook(data: ScientificBook) {
        const rows = await this.getScientificBookByUser(data.owner);

        if (rows.length === 0) {
            await this.addScientificBook(data);
            return;
        }

        await this.updateScientificBook(data);
    }

    /* Traduceri */
    static async deleteTranslationByUser(userId: number) {
        const query = `DELETE FROM translations WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getTranslationByUser(userId: number): Promise<Translation[]> {
        const query = `SELECT * FROM translations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    static async addOrUpdateTranslation(data: Translation) {
        const rows = await this.getTranslationByUser(data.owner);

        if (rows.length === 0) {
            await this.addTranslation(data);
            return;
        }

        await this.updateTranslation(data);
    }

    /* Comunicări în manifestări științifice */
    static async deleteScientificCommunicationByUser(userId: number) {
        const query = `DELETE FROM scientific_communications WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getScientificCommunicationByUser(userId: number): Promise<ScientificCommunication[]> {
        const query = `SELECT * FROM scientific_communications WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    static async addOrUpdateScientificCommunication(data: ScientificCommunication) {
        const rows = await this.getScientificCommunicationByUser(data.owner);

        if (rows.length === 0) {
            await this.addScientificCommunication(data);
            return;
        }

        await this.updateScientificCommunication(data);
    }

    /* Brevete */
    static async deletePatentByUser(userId: number) {
        const query = `DELETE FROM patents WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getPatentByUser(userId: number): Promise<Patent[]> {
        const query = `SELECT * FROM patents WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    static async addOrUpdatePatent(data: Patent) {
        const rows = await this.getPatentByUser(data.owner);

        if (rows.length === 0) {
            await this.addPatent(data);
            return;
        }

        await this.updatePatent(data);
    }

    /* Contracte de cercetare */
    static async deleteResearchContractByUser(userId: number) {
        const query = `DELETE FROM research_contracts WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getResearchContractByUser(userId: number): Promise<ResearchContract[]> {
        const query = `SELECT * FROM research_contracts WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    static async addOrUpdateResearchContract(data: ResearchContract) {
        const rows = await this.getResearchContractByUser(data.owner);

        if (rows.length === 0) {
            await this.addResearchContract(data);
            return;
        }

        await this.updateResearchContract(data);
    }

    /* Citări */
    static async deleteCitationByUser(userId: number) {
        const query = `DELETE FROM citations WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getCitationByUser(userId: number): Promise<Citation[]> {
        const query = `SELECT * FROM citations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    static async addOrUpdateCitation(data: Citation) {
        const rows = await this.getCitationByUser(data.owner);

        if (rows.length === 0) {
            await this.addCitation(data);
            return;
        }

        await this.updateCitation(data);
    }

    /* Premii si nominalizări */
    static async deleteAwardAndNominationByUser(userId: number) {
        const query = `DELETE FROM awards_and_nominations WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getAwardAndNominationByUser(userId: number): Promise<AwardAndNomination[]> {
        const query = `SELECT * FROM information WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    static async addOrUpdateAwardAndNomination(data: AwardAndNomination) {
        const rows = await this.getAwardAndNominationByUser(data.owner);

        if (rows.length === 0) {
            await this.addAwardAndNomination(data);
            return;
        }

        await this.updateAwardAndNomination(data);
    }

    /* Membru în academii */
    static async deleteAcademyMemberByUser(userId: number) {
        const query = `DELETE FROM academy_member WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getAcademyMemberByUser(userId: number): Promise<AcademyMember[]> {
        const query = `SELECT * FROM academy_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    static async addOrUpdateAcademyMember(data: AcademyMember) {
        const rows = await this.getAcademyMemberByUser(data.owner);

        if (rows.length === 0) {
            await this.addAcademyMember(data);
            return;
        }

        await this.updateAcademyMember(data);
    }

    /* Membru în echipa editorială */
    static async deleteEditorialMemberByUser(userId: number) {
        const query = `DELETE FROM editorial_member WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getEditorialMemberByUser(userId: number): Promise<EditorialMember[]> {
        const query = `SELECT * FROM editorial_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    static async addOrUpdateEditorialMember(data: EditorialMember) {
        const rows = await this.getEditorialMemberByUser(data.owner);

        if (rows.length === 0) {
            await this.addEditorialMember(data);
            return;
        }

        await this.updateEditorialMember(data);
    }

    /* Evenimente organizate */
    static async deleteOrganizedEventByUser(userId: number) {
        const query = `DELETE FROM organized_events WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getOrganizedEventByUser(userId: number): Promise<OrganizedEvent[]> {
        const query = `SELECT * FROM organized_events WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    static async addOrUpdateOrganizedEvent(data: OrganizedEvent) {
        const rows = await this.getOrganizedEventByUser(data.owner);

        if (rows.length === 0) {
            await this.addOrganizedEvent(data);
            return;
        }

        await this.updateOrganizedEvent(data);
    }

    /* Fără activitate științifică */
    static async deleteWithoutActivityByUser(userId: number) {
        const query = `DELETE FROM without_activity WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getWithoutActivityByUser(userId: number): Promise<WithoutActivity[]> {
        const query = `SELECT * FROM without_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    static async addOrUpdateWithoutActivity(data: WithoutActivity) {
        const rows = await this.getWithoutActivityByUser(data.owner);

        if (rows.length === 0) {
            await this.addWithoutActivity(data);
            return;
        }

        await this.updateWithoutActivity(data);
    }

    /* Activitate didactică */
    static async deleteDidacticActivityByUser(userId: number) {
        const query = `DELETE FROM didactic_activity WHERE owner = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [userId]);
        return rows;
    }

    static async getDidacticActivityByUser(userId: number): Promise<DidacticActivity[]> {
        const query = `SELECT * FROM didactic_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [userId]);

        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

    static async addOrUpdateDidacticActivity(data: DidacticActivity) {
        const rows = await this.getDidacticActivityByUser(data.owner);

        if (rows.length === 0) {
            await this.addDidacticActivity(data);
            return;
        }

        await this.updateDidacticActivity(data);
    }

}