import {TablesCrudRepository} from "./crud/tables.crud.repository";
import {
    AcademyMember,
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

    /* Informații */
    static async removeInformationByOwner(user: User) {
      const query = `DELETE FROM information WHERE owner = $1`;

      await QueryDB(query, [user.id]);
    }

    static async getInformationByOwner(user: User): Promise<Information[]> {
        const query = `SELECT * FROM information WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /* Articole științifice publicate în extenso...(ISI) */
    static async removeScientificArticleByOwner(user: User) {
        const query = `DELETE FROM scientific_article_isi WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getScientificArticleISIByOwner(user: User): Promise<ScientificArticleISI[]> {
        const query = `SELECT * FROM scientific_article_isi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /* ISI proceedings */
    static async removeISIProceedingsByOwner(user: User) {
        const query = `DELETE FROM isi_proceedings WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getISIProceedingByOwner(user: User): Promise<ISIProceeding[]> {
        const query = `SELECT * FROM isi_proceedings WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /* Articole științifice publicate în extenso... (BDI) */
    static async removeScientificArticleBDIByOwner(user: User) {
        const query = `DELETE FROM scientific_articles_bdi WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getScientificArticleBDIByOwner(user: User): Promise<ScientificArticleBDI[]> {
        const query = `SELECT * FROM scientific_articles_bdi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    static async removeScientificBookByOwner(user: User) {
        const query = `DELETE FROM scientific_books WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getScientificBookByOwner(user: User): Promise<ScientificBook[]> {
        const query = `SELECT * FROM scientific_books WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /* Traduceri */
    static async removeTranslationsByOwner(user: User) {
        const query = `DELETE FROM translations WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getTranslationByOwner(user: User): Promise<Translation[]> {
        const query = `SELECT * FROM translations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /* Comunicări în manifestări științifice */
    static async removeScientificCommunicationByOwner(user: User) {
        const query = `DELETE FROM scientific_communications WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getScientificCommunicationByOwner(user: User): Promise<ScientificCommunication[]> {
        const query = `SELECT * FROM scientific_communications WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /* Brevete */
    static async removePatenByOwner(user: User) {
        const query = `DELETE FROM patents WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getPatentByOwner(user: User): Promise<Patent[]> {
        const query = `SELECT * FROM patents WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /* Contracte de cercetare */
    static async removeResearchContractByOwner(user: User) {
        const query = `DELETE FROM research_contracts WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getResearchContractByOwner(user: User): Promise<ResearchContract[]> {
        const query = `SELECT * FROM research_contracts WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /* Citări */
    static async removeCitationByOwner(user: User) {
        const query = `DELETE FROM citations WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getCitationByOwner(user: User): Promise<Citation[]> {
        const query = `SELECT * FROM citations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /* Premii si nominalizări */
    static async removeAwardAndNominationByOwner(user: User) {
        const query = `DELETE FROM awards_and_nominations WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getAwardAndNominationByOwner(user: User): Promise<AwardAndNomination[]> {
        const query = `SELECT * FROM information WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /* Membru în academii */
    static async removeAcademyMemberByOwner(user: User) {
        const query = `DELETE FROM academy_member WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getAcademyMemberByOwner(user: User): Promise<AcademyMember[]> {
        const query = `SELECT * FROM academy_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /* Membru în echipa editorială */
    static async removeEditorialMemberByOwner(user: User) {
        const query = `DELETE FROM editorial_member WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getEditorialMemberByOwner(user: User): Promise<EditorialMember[]> {
        const query = `SELECT * FROM editorial_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /* Evenimente organizate */
    static async removeOrganizedEventByOwner(user: User) {
        const query = `DELETE FROM organized_events WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getOrganizedEventByOwner(user: User): Promise<OrganizedEvent[]> {
        const query = `SELECT * FROM organized_events WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /* Fără activitate științifică */
    static async removeWithoutActivityByOwner(user: User) {
        const query = `DELETE FROM without_activity WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getWithoutActivityByOwner(user: User): Promise<WithoutActivity[]> {
        const query = `SELECT * FROM without_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /* Activitate didactică */
    static async removeDidacticActivityByOwner(user: User) {
        const query = `DELETE FROM didactic_activity WHERE owner = $1`;

        await QueryDB(query, [user.id]);
    }

    static async getDidacticActivityByOwner(user: User): Promise<DidacticActivity[]> {
        const query = `SELECT * FROM didactic_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [user.id]);

        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

}