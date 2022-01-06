import {
    AcademyMember, Activation, Authentication,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember, Id,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI, ScientificBook, ScientificCommunication, Translation,
    WithoutActivity
} from "../../models";
import {QueryDB} from "../../connection";

/** CRUD repository for all tables.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer.*/
export abstract class TablesCrudRepository {
    /* ----==== Id ====---- */
    /** Id - READ */
    static async allIds() {
        const query = `SELECT * FROM ids`;

        const {rows} = await QueryDB(query, []);
        const list: Id[] = [];

        for (const row of rows) {
            list.push(new Id(row));
        }

        return list;
    }

    /** Id - CREATE */
    static async addId(data: Id) {
        const query = `INSERT INTO ids(identifier) VALUES ($1) RETURNING *`;
        const params = [data.identifier];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Id - REMOVE */
    static async removeId(data: Id) {
        const query = `DELETE FROM ids WHERE identifier = $1 RETURNING *`;
        const params = [data.identifier];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /* ----==== Authentication ====---- */

    /** Authentication - CREATE */
    static async addAuthentication(data: Authentication): Promise<Authentication[]> {
        const query = `INSERT INTO authentication(user_id, auth_key) VALUES ($1, $2) RETURNING *`;
        const params = [data.userId, data.authKey];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    /** Authentication - READ */
    static async getAuthentication(id: number): Promise<Authentication[]> {
        const query = `SELECT * FROM authentication WHERE id = $1`;
        const params = [id];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    /** Authentication - DELETE */
    static async deleteAuthentication(data: Authentication) {
        const query = `DELETE FROM authentication WHERE id = $1`;
        const params = [data.id];

        await QueryDB(query, params);
    }

    /* ----==== Activare ====---- */

    /** Activation - CREATE */
    static async addActivation(data: Activation): Promise<Activation[]> {
        const query = `INSERT INTO activation(user_id, activation_key) VALUES ($1, $2) RETURNING *`;
        const params = [data.userId, data.activationKey];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

    /** Activation - READ */
    static async getActivation(id: number): Promise<Activation[]> {
        const query = `SELECT * FROM activation WHERE id = $1`;
        const params = [id];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

    /** Activation - DELETE */
    static async deleteActivation(data: Activation) {
        const query = `DELETE FROM activation WHERE id = $1`;
        const params = [data.id];

        await QueryDB(query, params);
    }

    /* ----==== Informații ====---- */

    /** Information - ALL */
    static async allInformation(): Promise<Information[]> {
        const list: Information[] = [];
        const query = 'SELECT * FROM information';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /** Information - CREATE */
    static async addInformation(data: Information): Promise<Information[]> {
        const query = `INSERT INTO 
                       information(full_name, marriage_name, thesis_coordinator, founding, completion_date, owner, updated) 
                       VALUES ($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *`;

        const params = [data.fullName, data.marriageName, data.thesisCoordinator, data.founding,
                        data.completionDate, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /** Information - READ */
    static async getInformationById(id: number): Promise<Information | null> {
        const query = "SELECT * FROM information WHERE id = $1";

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new Information(rows[0]);
        }

        return null;
    }

    /** Information - UPDATE */
    static async updateInformation(data: Information) {
        const query = `UPDATE information 
                       SET full_name = $2, marriage_name = $3, thesis_coordinator = $4, founding = $5, completion_date = $6,
                       updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.fullName, data.marriageName, data.thesisCoordinator, data.founding, data.completionDate];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Information - DELETE */
    static async deleteInformation(data: Information) {
        const query = `DELETE FROM information WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Articole științifice publicate în extenso...(ISI) ====---- */

    /** Scientific Articles ISI - ALL */
    static async allScientificArticlesISI(): Promise<ScientificArticleISI[]> {
        const list: ScientificArticleISI[] = [];
        const query = 'SELECT * FROM scientific_article_isi';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /** Scientific Articles ISI - CREATE */
    static async addScientificArticleISI(data: ScientificArticleISI): Promise<ScientificArticleISI[]> {
        const query = `INSERT INTO scientific_article_isi
                       (article_title, authors, publication_date, volume, issue, starting_page, ending_page, 
                        impact_factor, cnatdcu_classification, doi, conference_name, observations, owner, updated) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, current_timestamp) RETURNING *`;

        const params = [data.articleTitle, data.authors, data.publicationDate, data.volume,
                        data.issue, data.startingPage, data.endingPage, data.impactFactor,
                        data.cnatdcuClassification, data.doi, data.conferenceName, data.observations,
                        data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /** Scientific Articles ISI - READ */
    static async getScientificArticleISI(id: number): Promise<ScientificArticleISI | null> {
        const query = "SELECT * FROM scientific_article_isi WHERE id = $1";

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ScientificArticleISI(rows[0]);
        }

        return null;
    }

    /** Scientific Articles ISI - UPDATE */
    static async updateScientificArticleISI(data: ScientificArticleISI) {
        const query = `UPDATE scientific_article_isi SET article_title = $2, authors = $3, publication_date = $4, 
                                  volume = $5, issue = $6, starting_page = $7, ending_page = $8, 
                                  impact_factor = $9, cnatdcu_classification = $10, doi = $11, conference_name = $12,
                                  observations = $13, updated = current_timestamp WHERE id = $1 RETURNING *`;

        const params = [data.id, data.articleTitle, data.authors, data.publicationDate, data.volume,
                        data.issue, data.startingPage, data.endingPage, data.impactFactor,
                        data.cnatdcuClassification, data.doi, data.conferenceName, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Scientific Articles ISI - DELETE */
    static async deleteScientificArticleISI(data: ScientificArticleISI) {
        const query = `DELETE FROM scientific_article_isi WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== ISI proceedings ====---- */

    /** ISI Proceedings - ALL */
    static async allISIProceedings(): Promise<ISIProceeding[]> {
        const list: ISIProceeding[] = [];
        const query = 'SELECT * FROM isi_proceedings';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /** ISI Proceedings - CREATE */
    static async addISIProceeding(data: ISIProceeding): Promise<ISIProceeding[]> {
        const query = `INSERT INTO isi_proceedings 
                       (article_title, authors, conference_name, indexed_volume_type, publication_year, 
                        article_type, conference_type, conference_link, starting_page, ending_page, observations, owner,
                        updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) RETURNING *`;

        const params = [data.articleTitle, data.authors, data.conferenceName, data.indexedVolumeType,
                        data.publicationYear, data.articleType, data.conferenceType, data.conferenceLink,
                        data.startingPage, data.endingPage, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /** ISI Proceedings - READ */
    static async getISIProceeding(id: number): Promise<ISIProceeding | null> {
        const query = "SELECT * FROM isi_proceedings WHERE id = $1";

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ISIProceeding(rows[0]);
        }

        return null;
    }

    /** ISI Proceedings - UPDATE */
    static async updateISIProceeding(data: ISIProceeding) {
        const query = `UPDATE isi_proceedings SET 
                       article_title = $2, authors = $3, conference_name = $4, indexed_volume_type = $5, publication_year = $6,
                       article_type = $7, conference_type = $8, conference_link = $9, starting_page = $10, ending_page = $11,
                       observations = $12, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.articleTitle, data.authors, data.conferenceName, data.indexedVolumeType,
                        data.publicationYear, data.articleType, data.conferenceType, data.conferenceLink,
                        data.startingPage, data.endingPage, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** ISI Proceedings - DELETE */
    static async deleteISIProceeding(data: ISIProceeding) {
        const query = `DELETE FROM isi_proceedings WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Articole științifice publicate în extenso... (BDI) ====---- */

    /** Scientific Articles BDI - ALL */
    static async allScientificArticlesBDI(): Promise<ScientificArticleBDI[]> {
        const list: ScientificArticleBDI[] = [];
        const query = `SELECT * FROM scientific_articles_bdi`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /** Scientific Articles BDI - CREATE */
    static async addScientificArticleBDI(data: ScientificArticleBDI): Promise<ScientificArticleBDI[]> {
        const query = `INSERT INTO scientific_articles_bdi
                       (hierarchy_domains, article_title, authors, bdi_indexed_magazine, publication_year, volume, 
                        number, starting_page, ending_page, international_magazine, cnatdcu_classification, 
                        indexed_article_link, bdi_database, bdi_database_link, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, current_timestamp) RETURNING *`;

        const params = [data.hierarchyDomains, data.articleTitle, data.authors, data.bdiIndexedMagazine,
            data.publicationYear, data.volume, data.number, data.startingPage, data.endingPage,
            data.internationalMagazine, data.cnatdcuClassification, data.indexedArticleLink, data.bdiDatabase,
            data.bdiDatabaseLink, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /** Scientific Articles BDI - READ */
    static async getScientificArticleBDI(id: number): Promise<ScientificArticleBDI | null> {
        const query = `SELECT * FROM scientific_articles_bdi WHERE id = $1`;
        
        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ScientificArticleBDI(rows[0]);
        }

        return null;
    }

    /** Scientific Articles BDI - UPDATE */
    static async updateScientificArticleBDI(data: ScientificArticleBDI) {
        const query = `UPDATE scientific_articles_bdi SET 
                       hierarchy_domains = $2, article_title = $3, authors = $4, bdi_indexed_magazine = $5,
                       publication_year = $6, volume = $7, number = $8, starting_page = $9, ending_page = $10,
                       international_magazine = $11, cnatdcu_classification = $12, indexed_article_link = $13, 
                       bdi_database = $14, bdi_database_link = $15, observations = $16, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.hierarchyDomains, data.articleTitle, data.authors, data.bdiIndexedMagazine,
                        data.publicationYear, data.volume, data.number, data.startingPage, data.endingPage,
                        data.internationalMagazine, data.cnatdcuClassification, data.indexedArticleLink, data.bdiDatabase,
                        data.bdiDatabaseLink, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Scientific Articles BDI - DELETE */
    static async deleteScientificArticleBDI(data: ScientificArticleBDI) {
        const query = `DELETE FROM scientific_articles_bdi WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Cărți ştiinţifice sau capitole de cărți publicate în edituri ====---- */

    /** Scientific Books - ALL */
    static async allScientificBooks(): Promise<ScientificBook[]> {
        const list: ScientificBook[] = [];
        const query = `SELECT * FROM scientific_books`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /** Scientific Books - CREATE */
    static async addScientificBook(data: ScientificBook): Promise<ScientificBook[]> {
        const query = `INSERT INTO scientific_books
                       (hierarchy_domains, chapter_title, authors, book_title, page_number, publication_year, 
                        publishing_house, publication_type, isbn, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp) RETURNING *`;

        const params = [data.hierarchyDomains, data.chapterTitle, data.authors, data.bookTitle,
                        data.pageNumber, data.publicationYear, data.publishingHouse, data.publicationType,
                        data.isbn, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /** Scientific Books - READ */
    static async getScientificBook(id: number): Promise<ScientificBook | null> {
        const query = `SELECT * FROM scientific_books WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ScientificBook(rows[0]);
        }

        return null;
    }

    /** Scientific Books - UPDATE */
    static async updateScientificBook(data: ScientificBook) {
        const query = `UPDATE scientific_books SET 
                       hierarchy_domains = $2, chapter_title = $3, authors = $4, book_title = $5, page_number = $6, 
                       publication_year = $7, publishing_house = $8, publication_type = $9, isbn = $10, observations = $11,
                       updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.hierarchyDomains, data.chapterTitle, data.authors, data.bookTitle,
            data.pageNumber, data.publicationYear, data.publishingHouse, data.publicationType,
            data.isbn, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Scientific Books - DELETE */
    static async deleteScientificBook(data: ScientificBook) {
        const query = `DELETE FROM scientific_books WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Traduceri ====---- */

    /** Translations - ALL */
    static async allTranslations(): Promise<Translation[]> {
        const list: Translation[] = [];
        const query = `SELECT * FROM translations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /** Translations - CREATE */
    static async addTranslation(data: Translation): Promise<Translation[]> {
        const query = `INSERT INTO translations
                       (hierarchy_domains, translation_title, authors, translated_authors, publication_year, 
                        publishing_house, country, page_number, isbn, translation_type, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) RETURNING *`;

        const params = [data.hierarchyDomains, data.translationTitle, data.authors, data.translatedAuthors,
                        data.publicationYear, data.publishingHouse, data.country, data.pageNumber, data.isbn,
                        data.translationType, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /** Translations - READ */
    static async getTranslation(id: number): Promise<Translation | null> {
        const query = `SELECT * FROM translations WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new Translation(rows[0]);
        }

        return null;
    }

    /** Translations - UPDATE */
    static async updateTranslation(data: Translation) {
        const query = `UPDATE translations SET 
                       hierarchy_domains = $2, translation_title = $3, authors = $4, translated_authors = $5, 
                       publication_year = $6, publishing_house = $7, country = $8, page_number = $9, isbn = $10,
                       translation_type = $11, observations = $12, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.hierarchyDomains, data.translationTitle, data.authors, data.translatedAuthors,
            data.publicationYear, data.publishingHouse, data.country, data.pageNumber, data.isbn,
            data.translationType, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Translations - DELETE */
    static async deleteTranslation(data: Translation) {
        const query = `DELETE FROM translations WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Comunicări în manifestări științifice ====---- */

    /** Scientific communications - ALL */
    static async allScientificCommunications(): Promise<ScientificCommunication[]> {
        const list: ScientificCommunication[] = [];
        const query = `SELECT * FROM scientific_communications`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /** Scientific communications - CREATE */
    static async addScientificCommunication(data: ScientificCommunication): Promise<ScientificCommunication[]> {
        const query = `INSERT INTO scientific_communications
                       (authors, communication_type, presentation_year, scientific_manifestation_name, 
                        manifestation_type, scientific_manifestation_link, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *`;

        const params = [data.authors, data.communicationType, data.presentationYear, data.scientificManifestationName,
                        data.manifestationType, data.scientificManifestationLink, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /** Scientific communications - READ */
    static async getScientificCommunication(id: number): Promise<ScientificCommunication | null> {
        const query = `SELECT * FROM scientific_communications WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ScientificCommunication(rows[0]);
        }

        return null;
    }

    /** Scientific communications - UPDATE */
    static async updateScientificCommunication(data: ScientificCommunication) {
        const query = `UPDATE scientific_communications SET 
                       authors = $2, communication_type = $3, presentation_year = $4, scientific_manifestation_name = $5,
                       manifestation_type = $6, scientific_manifestation_link = $7, observations = $8, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.authors, data.communicationType, data.presentationYear, data.scientificManifestationName,
            data.manifestationType, data.scientificManifestationLink, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Scientific communications - DELETE */
    static async deleteScientificCommunication(data: ScientificCommunication) {
        const query = `DELETE FROM scientific_communications WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Brevete ====---- */

    /** Patents - ALL */
    static async allPatents(): Promise<Patent[]> {
        const list: Patent[] = [];
        const query = `SELECT * FROM patents`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /** Patents - CREATE */
    static async addPatent(data: Patent): Promise<Patent[]> {
        const query = `INSERT INTO patents
                       (patent_title_or_cbi, authors, year_of_obtaining_patent, patent_number, patent_type, 
                        authority, country, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) RETURNING *`;

        const params = [data.patentTitleOrCBI, data.authors, data.yearOfObtainingPatent, data.patentNumber,
                        data.patentType, data.authority, data.country, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /** Patents - READ */
    static async getPatent(id: number): Promise<Patent | null> {
        const query = `SELECT * FROM patents WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new Patent(rows[0]);
        }

        return null;
    }

    /** Patents - UPDATE */
    static async updatePatent(data: Patent) {
        const query = `UPDATE patents SET 
                       patent_title_or_cbi = $2, authors = $3, year_of_obtaining_patent = $4, patent_number = $5, 
                       patent_type = $6, authority = $7, country = $8, observations = $9, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.patentTitleOrCBI, data.authors, data.yearOfObtainingPatent, data.patentNumber,
            data.patentType, data.authority, data.country, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Patents - DELETE */
    static async deletePatent(data: Patent) {
        const query = `DELETE FROM patents WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Contracte de cercetare ====---- */

    /** Research contracts - ALL */
    static async allResearchContracts(): Promise<ResearchContract[]> {
        const list: ResearchContract[] = [];
        const query = `SELECT * FROM research_contracts`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /** Research contracts - CREATE */
    static async addResearchContract(data: ResearchContract): Promise<ResearchContract[]> {
        const query = `INSERT INTO research_contracts
                       (research_contract_name_or_project, project_code, financier, function, start_project_period, 
                        end_project_period, contract_type, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) RETURNING *`;

        const params = [data.researchContractNameOrProject, data.projectCode, data.financier, data.function,
                        data.startProjectPeriod, data.endProjectPeriod, data.contractType, data.observations,
                        data.owner];

        const {rows} = await QueryDB(query, params);
        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /** Research contracts - READ */
    static async getResearchContract(id: number): Promise<ResearchContract | null> {
        const query = `SELECT * FROM research_contracts WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new ResearchContract(rows[0]);
        }

        return null;
    }

    /** Research contracts - UPDATE */
    static async updateResearchContract(data: ResearchContract) {
        const query = `UPDATE research_contracts SET 
                       research_contract_name_or_project = $2, project_code = $3, financier = $4, function = $5,
                       start_project_period = $6, end_project_period = $7, contract_type = $8, observations = $9,
                       updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.researchContractNameOrProject, data.projectCode, data.financier, data.function,
            data.startProjectPeriod, data.endProjectPeriod, data.contractType, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Research contracts - DELETE */
    static async deleteResearchContract(data: ResearchContract) {
        const query = `DELETE FROM research_contracts WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Citări ====---- */

    /** Citations - ALL */
    static async allCitations(): Promise<Citation[]> {
        const list: Citation[] = [];
        const query = `SELECT * FROM citations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /** Citations - CREATE */
    static async addCitation(data: Citation): Promise<Citation[]> {
        const query = `INSERT INTO citations
                       (article_title, authors, publication_title_where_referenced, authors_names_that_reference, 
                        citation_year, volume, impact_factor, issue, article_number, starting_page, ending_page, 
                        doi, cnatdcu_classification, citations, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, current_timestamp) RETURNING *`;

        const params = [data.articleTitle, data.authors, data.publicationTitleWhereReferenced,
                        data.authorsNamesThatReference, data.citationYear, data.volume, data.impactFactor,
                        data.issue, data.articleNumber, data.startingPage, data.endingPage, data.doi,
                        data.cnatdcuClassification, data.citations, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /** Citations - READ */
    static async getCitation(id: number): Promise<Citation | null> {
        const query = `SELECT * FROM citations WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new Citation(rows[0]);
        }

        return null;
    }

    /** Citations - UPDATE */
    static async updateCitation(data: Citation) {
        const query = `UPDATE citations SET 
                       article_title = $2, authors = $3, publication_title_where_referenced = $4, 
                       authors_names_that_reference = $5, citation_year = $6, volume = $7, impact_factor = $8, 
                       issue = $9, article_number = $10, starting_page = $11, ending_page = $12, doi = $13, 
                       cnatdcu_classification = $14, citations = $15, observations = $16, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.articleTitle, data.authors, data.publicationTitleWhereReferenced,
            data.authorsNamesThatReference, data.citationYear, data.volume, data.impactFactor,
            data.issue, data.articleNumber, data.startingPage, data.endingPage, data.doi,
            data.cnatdcuClassification, data.citations, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Citations - DELETE */
    static async deleteCitation(data: Citation) {
        const query = `DELETE FROM citations WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Premii si nominalizări ====---- */

    /** Awards and nominations - ALL */
    static async allAwardAndNominations(): Promise<AwardAndNomination[]> {
        const list: AwardAndNomination[] = [];
        const query = `SELECT * FROM awards_and_nominations`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /** Awards and nominations - CREATE */
    static async addAwardAndNomination(data: AwardAndNomination): Promise<AwardAndNomination[]> {
        const query = `INSERT INTO awards_and_nominations
                       (year_of_award, award_name, award_type, organization_that_give_the_award, country, 
                        awarded_for, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *`;

        const params = [data.yearOfAward, data.awardName, data.awardType, data.organizationThatGiveTheAward,
                        data.country, data.awardedFor, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /** Awards and nominations - READ */
    static async getAwardAndNomination(id: number): Promise<AwardAndNomination | null> {
        const query = `SELECT * FROM awards_and_nominations WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new AwardAndNomination(rows[0]);
        }

        return null;
    }

    /** Awards and nominations - UPDATE */
    static async updateAwardAndNomination(data: AwardAndNomination) {
        const query = `UPDATE awards_and_nominations SET 
                       year_of_award = $2, award_name = $3, award_type = $4, organization_that_give_the_award = $5, 
                       country = $6, awarded_for = $7, observations = $8, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.yearOfAward, data.awardName, data.awardType, data.organizationThatGiveTheAward,
            data.country, data.awardedFor, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Awards and nominations - DELETE */
    static async deleteAwardAndNomination(data: AwardAndNomination) {
        const query = `DELETE FROM awards_and_nominations WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Membru în academii ====---- */

    /** Academy member - ALL */
    static async allAcademyMembers(): Promise<AcademyMember[]> {
        const list: AcademyMember[] = [];
        const query = `SELECT * FROM academy_member`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /** Academy member - CREATE */
    static async addAcademyMember(data: AcademyMember): Promise<AcademyMember[]> {
        const query = `INSERT INTO academy_member
                       (admission_year, academy_name, member_type, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING *`;

        const params = [data.admissionYear, data.academyName, data.memberType, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /** Academy member - READ */
    static async getAcademyMember(id: number): Promise<AcademyMember | null> {
        const query = `SELECT * FROM academy_member WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new AcademyMember(rows[0]);
        }

        return null;
    }

    /** Academy member - UPDATE */
    static async updateAcademyMember(data: AcademyMember) {
        const query = `UPDATE academy_member SET 
                       admission_year = $2, academy_name = $3, member_type = $4, observations = $5, 
                       updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.admissionYear, data.academyName, data.memberType, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Academy member - DELETE */
    static async deleteAcademyMember(data: AcademyMember) {
        const query = `DELETE FROM academy_member WHERE id = $1`;
        
        await QueryDB(query, [data.id]);
    }

    /* ----==== Membru în echipa editorială ====---- */

    /** Editorial member - ALL */
    static async allEditorialMember(): Promise<EditorialMember[]> {
        const list: EditorialMember[] = [];
        const query = `SELECT * FROM editorial_member`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /** Editorial member - CREATE */
    static async addEditorialMember(data: EditorialMember): Promise<EditorialMember[]> {
        const query = `INSERT INTO editorial_member
                       (committee_name, magazine_name, year_of_committee_attendance, quality, magazine_type, 
                        national_or_international, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *`;

        const params = [data.committeeName, data.magazineName, data.yearOfCommitteeAttendance, data.quality,
                        data.magazineType, data.nationalOrInternational, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /** Editorial member - READ */
    static async getEditorialMember(id: number): Promise<EditorialMember | null> {
        const query = `SELECT * FROM academy_member WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new EditorialMember(rows[0]);
        }

        return null;
    }

    /** Editorial member - UPDATE */
    static async updateEditorialMember(data: EditorialMember) {
        const query = `UPDATE editorial_member SET 
                       committee_name = $2, magazine_name = $3, year_of_committee_attendance = $4, quality = $5, 
                       magazine_type = $6, national_or_international = $7, observations = $8, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.committeeName, data.magazineName, data.yearOfCommitteeAttendance,
                        data.quality, data.magazineType, data.nationalOrInternational, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Editorial member - DELETE */
    static async deleteEditorialMember(data: EditorialMember) {
        const query = `DELETE FROM editorial_member WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Evenimente organizate ====---- */

    /** Organized events - ALL */
    static async allOrganizedEvents(): Promise<OrganizedEvent[]> {
        const list: OrganizedEvent[] = [];
        const query = `SELECT * FROM organized_events`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /** Organized events - CREATE */
    static async addOrganizedEvent(data: OrganizedEvent): Promise<OrganizedEvent[]> {
        const query = `INSERT INTO organized_events
                       (manifestation_name, start_date, end_date, manifestation_place, manifestation_type, 
                        manifestation_classification, manifestation_link, contact_person, observations, owner, updated)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, current_timestamp) RETURNING *`;

        const params = [data.manifestationName, data.startDate, data.endDate, data.manifestationPlace,
                        data.manifestationType, data.manifestationClassification, data.manifestationLink,
                        data.contactPerson, data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /** Organized events - READ */
    static async getOrganizedEvent(id: number): Promise<OrganizedEvent | null> {
        const query = `SELECT * FROM organized_events WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new OrganizedEvent(rows[0]);
        }

        return null;
    }

    /** Organized events - UPDATE */
    static async updateOrganizedEvent(data: OrganizedEvent) {
        const query = `UPDATE organized_events SET 
                       manifestation_name = $2, start_date = $3, end_date = $4, manifestation_place = $5, 
                       manifestation_type = $6, manifestation_classification = $7, manifestation_link = $8, 
                       contact_person = $9, observations = $10, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.manifestationName, data.startDate, data.endDate,
                        data.manifestationPlace, data.manifestationType, data.manifestationClassification,
                        data.manifestationLink, data.contactPerson, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Organized events - DELETE */
    static async deleteOrganizedEvent(data: OrganizedEvent) {
        const query = `DELETE FROM organized_events WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Fără activitate științifică ====---- */

    /** Without activity - ALL */
    static async allWithoutActivities(): Promise<WithoutActivity[]> {
        const list: WithoutActivity[] = [];
        const query = `SELECT * FROM without_activity`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /** Without activity - CREATE */
    static async addWithoutActivity(data: WithoutActivity): Promise<WithoutActivity[]> {
        const query = `INSERT INTO without_activity
                       (observations, owner, updated)
                       VALUES ($1, $2, current_timestamp) RETURNING *`;

        const params = [data.observations, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /** Without activity - READ */
    static async getWithoutActivity(id: number): Promise<WithoutActivity | null> {
        const query = `SELECT * FROM without_activity WHERE id = $1`;

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new WithoutActivity(rows[0]);
        }

        return null;
    }

    /** Without activity - UPDATE */
    static async updateWithoutActivity(data: WithoutActivity) {
        const query = `UPDATE without_activity SET 
                       observations = $2, updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.observations];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Without activity - DELETE */
    static async deleteWithoutActivity(data: WithoutActivity) {
        const query = `DELETE FROM without_activity WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

    /* ----==== Activitate didactică ====---- */

    /** Didactic activity - ALL */
    static async allDidacticActivities(): Promise<DidacticActivity[]> {
        const list: DidacticActivity[] = [];
        const query = `SELECT * FROM didactic_activity`;

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

    /** Didactic activity - CREATE */
    static async addDidacticActivity(data: DidacticActivity): Promise<DidacticActivity[]> {
        const query = `INSERT INTO didactic_activity
                       (class_name, activity_type, year_of_attending_activity, owner, updated)
                       VALUES ($1, $2, $3, $4, current_timestamp) RETURNING *`;

        const params = [data.className, data.activityType, data.yearOfAttendingActivity, data.owner];

        const {rows} = await QueryDB(query, params);
        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

    /** Didactic activity - READ */
    static async getDidacticActivity(id: number): Promise<DidacticActivity | null> {
        const query = `SELECT * FROM didactic_activity WHERE id = $1`;
        
        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new DidacticActivity(rows[0]);
        }

        return null;
    }

    /** Didactic activity - UPDATE */
    static async updateDidacticActivity(data: DidacticActivity) {
        const query = `UPDATE didactic_activity SET 
                       class_name = $2, activity_type = $3, year_of_attending_activity = $4,
                       updated = current_timestamp
                       WHERE id = $1 RETURNING *`;

        const params = [data.id, data.className, data.activityType, data.yearOfAttendingActivity];

        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Didactic activity - DELETE */
    static async deleteDidacticActivity(data: DidacticActivity) {
        const query = `DELETE FROM didactic_activity WHERE id = $1`;

        await QueryDB(query, [data.id]);
    }

}