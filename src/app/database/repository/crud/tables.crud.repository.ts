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
        const query = 'SELECT * FROM information';

        const {rows} = await QueryDB(query, []);
        const list: Information[] = [];

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
    static async getInformation(owner: number): Promise<Information[]> {
        const query = `SELECT * FROM information WHERE owner = $1`;
        const {rows} = await QueryDB(query, [owner]);

        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /** Information - UPDATE */
    static async updateInformation(data: Information): Promise<Information[]> {
        const query = `UPDATE information 
                       SET full_name = $3, marriage_name = $4, thesis_coordinator = $5, founding = $6, completion_date = $7,
                       updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.fullName, data.marriageName, data.thesisCoordinator, data.founding, data.completionDate];

        const {rows} = await QueryDB(query, params);
        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /** Information - DELETE */
    static async deleteInformation(data: Information): Promise<Information[]> {
        const query = `DELETE FROM information WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: Information[] = [];

        for (const row of rows) {
            list.push(new Information(row));
        }

        return list;
    }

    /* ----==== Articole științifice publicate în extenso...(ISI) ====---- */

    /** Scientific Articles ISI - ALL */
    static async allScientificArticlesISI(): Promise<ScientificArticleISI[]> {
        const query = 'SELECT * FROM scientific_article_isi';

        const {rows} = await QueryDB(query, []);
        const list: ScientificArticleISI[] = [];

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
    static async getScientificArticleISI(owner: number): Promise<ScientificArticleISI[]> {
        const query = `SELECT * FROM scientific_article_isi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /** Scientific Articles ISI - UPDATE */
    static async updateScientificArticleISI(data: ScientificArticleISI): Promise<ScientificArticleISI[]> {
        const query = `UPDATE scientific_article_isi SET article_title = $3, authors = $4, publication_date = $5, 
                                  volume = $6, issue = $7, starting_page = $8, ending_page = $9, 
                                  impact_factor = $10, cnatdcu_classification = $11, doi = $12, conference_name = $13,
                                  observations = $14, updated = current_timestamp WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.articleTitle, data.authors, data.publicationDate, data.volume,
                        data.issue, data.startingPage, data.endingPage, data.impactFactor,
                        data.cnatdcuClassification, data.doi, data.conferenceName, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /** Scientific Articles ISI - DELETE */
    static async deleteScientificArticleISI(data: ScientificArticleISI): Promise<ScientificArticleISI[]> {
        const query = `DELETE FROM scientific_article_isi WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ScientificArticleISI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleISI(row));
        }

        return list;
    }

    /* ----==== ISI proceedings ====---- */

    /** ISI Proceedings - ALL */
    static async allISIProceedings(): Promise<ISIProceeding[]> {
        const query = 'SELECT * FROM isi_proceedings';

        const {rows} = await QueryDB(query, []);
        const list: ISIProceeding[] = [];

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
    static async getISIProceeding(owner: number): Promise<ISIProceeding[]> {
        const query = `SELECT * FROM isi_proceedings WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /** ISI Proceedings - UPDATE */
    static async updateISIProceeding(data: ISIProceeding): Promise<ISIProceeding[]> {
        const query = `UPDATE isi_proceedings SET 
                       article_title = $3, authors = $4, conference_name = $5, indexed_volume_type = $6, publication_year = $7,
                       article_type = $8, conference_type = $9, conference_link = $10, starting_page = $11, ending_page = $12,
                       observations = $13, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.articleTitle, data.authors, data.conferenceName, data.indexedVolumeType,
                        data.publicationYear, data.articleType, data.conferenceType, data.conferenceLink,
                        data.startingPage, data.endingPage, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /** ISI Proceedings - DELETE */
    static async deleteISIProceeding(data: ISIProceeding): Promise<ISIProceeding[]> {
        const query = `DELETE FROM isi_proceedings WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ISIProceeding[] = [];

        for (const row of rows) {
            list.push(new ISIProceeding(row));
        }

        return list;
    }

    /* ----==== Articole științifice publicate în extenso... (BDI) ====---- */

    /** Scientific Articles BDI - ALL */
    static async allScientificArticlesBDI(): Promise<ScientificArticleBDI[]> {
        const query = `SELECT * FROM scientific_articles_bdi`;

        const {rows} = await QueryDB(query, []);
        const list: ScientificArticleBDI[] = [];

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
    static async getScientificArticleBDI(owner: number): Promise<ScientificArticleBDI[]> {
        const query = `SELECT * FROM scientific_articles_bdi WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /** Scientific Articles BDI - UPDATE */
    static async updateScientificArticleBDI(data: ScientificArticleBDI): Promise<ScientificArticleBDI[]> {
        const query = `UPDATE scientific_articles_bdi SET 
                       hierarchy_domains = $3, article_title = $4, authors = $5, bdi_indexed_magazine = $6,
                       publication_year = $7, volume = $8, number = $9, starting_page = $10, ending_page = $11,
                       international_magazine = $12, cnatdcu_classification = $13, indexed_article_link = $14, 
                       bdi_database = $15, bdi_database_link = $16, observations = $17, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.hierarchyDomains, data.articleTitle, data.authors, data.bdiIndexedMagazine,
                        data.publicationYear, data.volume, data.number, data.startingPage, data.endingPage,
                        data.internationalMagazine, data.cnatdcuClassification, data.indexedArticleLink, data.bdiDatabase,
                        data.bdiDatabaseLink, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /** Scientific Articles BDI - DELETE */
    static async deleteScientificArticleBDI(data: ScientificArticleBDI): Promise<ScientificArticleBDI[]> {
        const query = `DELETE FROM scientific_articles_bdi WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ScientificArticleBDI[] = [];

        for (const row of rows) {
            list.push(new ScientificArticleBDI(row));
        }

        return list;
    }

    /* ----==== Cărți ştiinţifice sau capitole de cărți publicate în edituri ====---- */

    /** Scientific Books - ALL */
    static async allScientificBooks(): Promise<ScientificBook[]> {
        const query = `SELECT * FROM scientific_books`;

        const {rows} = await QueryDB(query, []);
        const list: ScientificBook[] = [];

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
    static async getScientificBook(owner: number): Promise<ScientificBook[]> {
        const query = `SELECT * FROM scientific_books WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /** Scientific Books - UPDATE */
    static async updateScientificBook(data: ScientificBook): Promise<ScientificBook[]> {
        const query = `UPDATE scientific_books SET 
                       hierarchy_domains = $3, chapter_title = $4, authors = $5, book_title = $6, page_number = $7, 
                       publication_year = $8, publishing_house = $9, publication_type = $10, isbn = $11, observations = $12,
                       updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.hierarchyDomains, data.chapterTitle, data.authors, data.bookTitle,
            data.pageNumber, data.publicationYear, data.publishingHouse, data.publicationType,
            data.isbn, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /** Scientific Books - DELETE */
    static async deleteScientificBook(data: ScientificBook): Promise<ScientificBook[]> {
        const query = `DELETE FROM scientific_books WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ScientificBook[] = [];

        for (const row of rows) {
            list.push(new ScientificBook(row));
        }

        return list;
    }

    /* ----==== Traduceri ====---- */

    /** Translations - ALL */
    static async allTranslations(): Promise<Translation[]> {
        const query = `SELECT * FROM translations`;

        const {rows} = await QueryDB(query, []);
        const list: Translation[] = [];

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
    static async getTranslation(owner: number): Promise<Translation[]> {
        const query = `SELECT * FROM translations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /** Translations - UPDATE */
    static async updateTranslation(data: Translation): Promise<Translation[]> {
        const query = `UPDATE translations SET 
                       hierarchy_domains = $3, translation_title = $4, authors = $5, translated_authors = $6, 
                       publication_year = $7, publishing_house = $8, country = $9, page_number = $10, isbn = $11,
                       translation_type = $12, observations = $13, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.hierarchyDomains, data.translationTitle, data.authors, data.translatedAuthors,
            data.publicationYear, data.publishingHouse, data.country, data.pageNumber, data.isbn,
            data.translationType, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /** Translations - DELETE */
    static async deleteTranslation(data: Translation): Promise<Translation[]> {
        const query = `DELETE FROM translations WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: Translation[] = [];

        for (const row of rows) {
            list.push(new Translation(row));
        }

        return list;
    }

    /* ----==== Comunicări în manifestări științifice ====---- */

    /** Scientific communications - ALL */
    static async allScientificCommunications(): Promise<ScientificCommunication[]> {
        const query = `SELECT * FROM scientific_communications`;

        const {rows} = await QueryDB(query, []);
        const list: ScientificCommunication[] = [];

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
    static async getScientificCommunication(owner: number): Promise<ScientificCommunication[]> {
        const query = `SELECT * FROM scientific_communications WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /** Scientific communications - UPDATE */
    static async updateScientificCommunication(data: ScientificCommunication): Promise<ScientificCommunication[]> {
        const query = `UPDATE scientific_communications SET 
                       authors = $3, communication_type = $4, presentation_year = $5, scientific_manifestation_name = $6,
                       manifestation_type = $7, scientific_manifestation_link = $8, observations = $9, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.authors, data.communicationType, data.presentationYear, data.scientificManifestationName,
            data.manifestationType, data.scientificManifestationLink, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /** Scientific communications - DELETE */
    static async deleteScientificCommunication(data: ScientificCommunication): Promise<ScientificCommunication[]> {
        const query = `DELETE FROM scientific_communications WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ScientificCommunication[] = [];

        for (const row of rows) {
            list.push(new ScientificCommunication(row));
        }

        return list;
    }

    /* ----==== Brevete ====---- */

    /** Patents - ALL */
    static async allPatents(): Promise<Patent[]> {
        const query = `SELECT * FROM patents`;

        const {rows} = await QueryDB(query, []);
        const list: Patent[] = [];

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
    static async getPatent(owner: number): Promise<Patent[]> {
        const query = `SELECT * FROM patents WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /** Patents - UPDATE */
    static async updatePatent(data: Patent): Promise<Patent[]> {
        const query = `UPDATE patents SET 
                       patent_title_or_cbi = $3, authors = $4, year_of_obtaining_patent = $5, patent_number = $6, 
                       patent_type = $7, authority = $8, country = $9, observations = $10, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.patentTitleOrCBI, data.authors, data.yearOfObtainingPatent, data.patentNumber,
            data.patentType, data.authority, data.country, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /** Patents - DELETE */
    static async deletePatent(data: Patent): Promise<Patent[]> {
        const query = `DELETE FROM patents WHERE id = $1 AND owner =  $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: Patent[] = [];

        for (const row of rows) {
            list.push(new Patent(row));
        }

        return list;
    }

    /* ----==== Contracte de cercetare ====---- */

    /** Research contracts - ALL */
    static async allResearchContracts(): Promise<ResearchContract[]> {
        const query = `SELECT * FROM research_contracts`;

        const {rows} = await QueryDB(query, []);
        const list: ResearchContract[] = [];

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
    static async getResearchContract(owner: number): Promise<ResearchContract[]> {
        const query = `SELECT * FROM research_contracts WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /** Research contracts - UPDATE */
    static async updateResearchContract(data: ResearchContract): Promise<ResearchContract[]> {
        const query = `UPDATE research_contracts SET 
                       research_contract_name_or_project = $3, project_code = $4, financier = $5, function = $6,
                       start_project_period = $7, end_project_period = $8, contract_type = $9, observations = $10,
                       updated = current_timestamp
                       WHERE id = $1 and owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.researchContractNameOrProject, data.projectCode, data.financier, data.function,
            data.startProjectPeriod, data.endProjectPeriod, data.contractType, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /** Research contracts - DELETE */
    static async deleteResearchContract(data: ResearchContract): Promise<ResearchContract[]> {
        const query = `DELETE FROM research_contracts WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: ResearchContract[] = [];

        for (const row of rows) {
            list.push(new ResearchContract(row));
        }

        return list;
    }

    /* ----==== Citări ====---- */

    /** Citations - ALL */
    static async allCitations(): Promise<Citation[]> {
        const query = `SELECT * FROM citations`;

        const {rows} = await QueryDB(query, []);
        const list: Citation[] = [];

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
    static async getCitation(owner: number): Promise<Citation[]> {
        const query = `SELECT * FROM citations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /** Citations - UPDATE */
    static async updateCitation(data: Citation): Promise<Citation[]> {
        const query = `UPDATE citations SET 
                       article_title = $3, authors = $4, publication_title_where_referenced = $5, 
                       authors_names_that_reference = $6, citation_year = $7, volume = $8, impact_factor = $9, 
                       issue = $10, article_number = $11, starting_page = $12, ending_page = $13, doi = $14, 
                       cnatdcu_classification = $15, citations = $16, observations = $17, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.articleTitle, data.authors, data.publicationTitleWhereReferenced,
            data.authorsNamesThatReference, data.citationYear, data.volume, data.impactFactor,
            data.issue, data.articleNumber, data.startingPage, data.endingPage, data.doi,
            data.cnatdcuClassification, data.citations, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /** Citations - DELETE */
    static async deleteCitation(data: Citation): Promise<Citation[]> {
        const query = `DELETE FROM citations WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: Citation[] = [];

        for (const row of rows) {
            list.push(new Citation(row));
        }

        return list;
    }

    /* ----==== Premii si nominalizări ====---- */

    /** Awards and nominations - ALL */
    static async allAwardAndNominations(): Promise<AwardAndNomination[]> {
        const query = `SELECT * FROM awards_and_nominations`;

        const {rows} = await QueryDB(query, []);
        const list: AwardAndNomination[] = [];

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
    static async getAwardAndNomination(owner: number): Promise<AwardAndNomination[]> {
        const query = `SELECT * FROM awards_and_nominations WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /** Awards and nominations - UPDATE */
    static async updateAwardAndNomination(data: AwardAndNomination): Promise<AwardAndNomination[]> {
        const query = `UPDATE awards_and_nominations SET 
                       year_of_award = $3, award_name = $4, award_type = $5, organization_that_give_the_award = $6, 
                       country = $7, awarded_for = $8, observations = $9, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.yearOfAward, data.awardName, data.awardType, data.organizationThatGiveTheAward,
            data.country, data.awardedFor, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /** Awards and nominations - DELETE */
    static async deleteAwardAndNomination(data: AwardAndNomination): Promise<AwardAndNomination[]> {
        const query = `DELETE FROM awards_and_nominations WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: AwardAndNomination[] = [];

        for (const row of rows) {
            list.push(new AwardAndNomination(row));
        }

        return list;
    }

    /* ----==== Membru în academii ====---- */

    /** Academy member - ALL */
    static async allAcademyMembers(): Promise<AcademyMember[]> {
        const query = `SELECT * FROM academy_member`;

        const {rows} = await QueryDB(query, []);
        const list: AcademyMember[] = [];

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
    static async getAcademyMember(owner: number): Promise<AcademyMember[]> {
        const query = `SELECT * FROM academy_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /** Academy member - UPDATE */
    static async updateAcademyMember(data: AcademyMember): Promise<AcademyMember[]> {
        const query = `UPDATE academy_member SET 
                       admission_year = $3, academy_name = $4, member_type = $5, observations = $6, 
                       updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.admissionYear, data.academyName, data.memberType, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /** Academy member - DELETE */
    static async deleteAcademyMember(data: AcademyMember): Promise<AcademyMember[]> {
        const query = `DELETE FROM academy_member WHERE id = $1 AND owner = $2`;
        
        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: AcademyMember[] = [];

        for (const row of rows) {
            list.push(new AcademyMember(row));
        }

        return list;
    }

    /* ----==== Membru în echipa editorială ====---- */

    /** Editorial member - ALL */
    static async allEditorialMember(): Promise<EditorialMember[]> {
        const query = `SELECT * FROM editorial_member`;

        const {rows} = await QueryDB(query, []);
        const list: EditorialMember[] = [];

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
    static async getEditorialMember(owner: number): Promise<EditorialMember[]> {
        const query = `SELECT * FROM editorial_member WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /** Editorial member - UPDATE */
    static async updateEditorialMember(data: EditorialMember): Promise<EditorialMember[]> {
        const query = `UPDATE editorial_member SET 
                       committee_name = $3, magazine_name = $4, year_of_committee_attendance = $5, quality = $6, 
                       magazine_type = $7, national_or_international = $8, observations = $9, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.committeeName, data.magazineName, data.yearOfCommitteeAttendance,
                        data.quality, data.magazineType, data.nationalOrInternational, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /** Editorial member - DELETE */
    static async deleteEditorialMember(data: EditorialMember): Promise<EditorialMember[]> {
        const query = `DELETE FROM editorial_member WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: EditorialMember[] = [];

        for (const row of rows) {
            list.push(new EditorialMember(row));
        }

        return list;
    }

    /* ----==== Evenimente organizate ====---- */

    /** Organized events - ALL */
    static async allOrganizedEvents(): Promise<OrganizedEvent[]> {
        const query = `SELECT * FROM organized_events`;

        const {rows} = await QueryDB(query, []);
        const list: OrganizedEvent[] = [];

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
    static async getOrganizedEvent(owner: number): Promise<OrganizedEvent[]> {
        const query = `SELECT * FROM organized_events WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /** Organized events - UPDATE */
    static async updateOrganizedEvent(data: OrganizedEvent): Promise<OrganizedEvent[]> {
        const query = `UPDATE organized_events SET 
                       manifestation_name = $3, start_date = $4, end_date = $5, manifestation_place = $6, 
                       manifestation_type = $7, manifestation_classification = $8, manifestation_link = $9, 
                       contact_person = $10, observations = $11, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.manifestationName, data.startDate, data.endDate,
                        data.manifestationPlace, data.manifestationType, data.manifestationClassification,
                        data.manifestationLink, data.contactPerson, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /** Organized events - DELETE */
    static async deleteOrganizedEvent(data: OrganizedEvent): Promise<OrganizedEvent[]> {
        const query = `DELETE FROM organized_events WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: OrganizedEvent[] = [];

        for (const row of rows) {
            list.push(new OrganizedEvent(row));
        }

        return list;
    }

    /* ----==== Fără activitate științifică ====---- */

    /** Without activity - ALL */
    static async allWithoutActivities(): Promise<WithoutActivity[]> {
        const query = `SELECT * FROM without_activity`;

        const {rows} = await QueryDB(query, []);
        const list: WithoutActivity[] = [];

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
    static async getWithoutActivity(owner: number): Promise<WithoutActivity[]> {
        const query = `SELECT * FROM without_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /** Without activity - UPDATE */
    static async updateWithoutActivity(data: WithoutActivity): Promise<WithoutActivity[]> {
        const query = `UPDATE without_activity SET 
                       observations = $3, updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.owner, data.observations];

        const {rows} = await QueryDB(query, params);
        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /** Without activity - DELETE */
    static async deleteWithoutActivity(data: WithoutActivity): Promise<WithoutActivity[]> {
        const query = `DELETE FROM without_activity WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: WithoutActivity[] = [];

        for (const row of rows) {
            list.push(new WithoutActivity(row));
        }

        return list;
    }

    /* ----==== Activitate didactică ====---- */

    /** Didactic activity - ALL */
    static async allDidacticActivities(): Promise<DidacticActivity[]> {
        const query = `SELECT * FROM didactic_activity`;

        const {rows} = await QueryDB(query, []);
        const list: DidacticActivity[] = [];

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
    static async getDidacticActivity(owner: number): Promise<DidacticActivity[]> {
        const query = `SELECT * FROM didactic_activity WHERE owner = $1`;

        const {rows} = await QueryDB(query, [owner]);
        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

    /** Didactic activity - UPDATE */
    static async updateDidacticActivity(data: DidacticActivity): Promise<DidacticActivity[]> {
        const query = `UPDATE didactic_activity SET 
                       class_name = $3, activity_type = $4, year_of_attending_activity = $5,
                       updated = current_timestamp
                       WHERE id = $1 AND owner = $2 RETURNING *`;

        const params = [data.id, data.className, data.activityType, data.yearOfAttendingActivity];

        const {rows} = await QueryDB(query, params);
        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

    /** Didactic activity - DELETE */
    static async deleteDidacticActivity(data: DidacticActivity): Promise<DidacticActivity[]> {
        const query = `DELETE FROM didactic_activity WHERE id = $1 AND owner = $2`;

        const {rows} = await QueryDB(query, [data.id, data.owner]);
        const list: DidacticActivity[] = [];

        for (const row of rows) {
            list.push(new DidacticActivity(row));
        }

        return list;
    }

}