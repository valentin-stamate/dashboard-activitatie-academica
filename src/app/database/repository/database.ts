import {QueryDB} from "../connection";

class Database {

    static async initializeDatabase() {
        /* Tables */
        await DatabaseTables.createUserTable();
        await DatabaseTables.createInformationTable();
        await DatabaseTables.createScientificArticlesISITable();
        await DatabaseTables.createISIProceedingsTable();
        await DatabaseTables.createScientificArticlesBDITable();
        await DatabaseTables.createScientificBooksTable();
        await DatabaseTables.createTranslationsTable();
        await DatabaseTables.createScientificCommunicationsTable();
        await DatabaseTables.createPatentsTable();
        await DatabaseTables.createResearchContractsTable();
        await DatabaseTables.createCitationsTable();
        await DatabaseTables.createAwardsAndNominationsTable();
        await DatabaseTables.createAcademyMemberTable();
        await DatabaseTables.createEditorialMemberTable();
        await DatabaseTables.createOrganizedEventsTable();
        await DatabaseTables.createWithoutActivityTable();
        await DatabaseTables.createDidacticActivityTable();

        /* Table relations */

    }

}

/** This class contains the methods to create the database schema */
abstract class DatabaseTables {
    /** Utilizatori */
    static async createUserTable() {
        const query = `CREATE TABLE users (
            id SERIAL,
        
            user_id VARCHAR(30) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
            admin BOOLEAN DEFAULT FALSE NOT NULL,
            activated BOOLEAN DEFAULT FALSE NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Informații */
    static async createInformationTable() {
        const query =  `CREATE TABLE information (
            id SERIAL,
        
            full_name VARCHAR(60) NOT NULL,
            marriage_name VARCHAR(60) NOT NULL,
            thesis_coordinator VARCHAR(60) NOT NULL,
            founding VARCHAR(20) NOT NULL,
            completion_date VARCHAR(30) NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Articole ştiintifice publicate în extenso...(ISI) */
    static async createScientificArticlesISITable() {
        const query = `CREATE TABLE scientific_article_isi (
            id SERIAL,
        
            article_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            publication_date VARCHAR(30) NOT NULL,
            volume VARCHAR(128) NOT NULL,
            issue VARCHAR(128) NOT NULL,
            starting_page VARCHAR(4) NOT NULL,
            ending_page VARCHAR(4) NOT NULL,
            impact_factor VARCHAR(128) NOT NULL,
            cnatdcu_classification VARCHAR(128) NOT NULL,
            doi VARCHAR(128) NOT NULL,
            conference_name VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }


    /** ISI proceedings */
    static async createISIProceedingsTable() {
        const query = `CREATE TABLE isi_proceedings (
            id SERIAL,
        
            article_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            conference_name VARCHAR(128) NOT NULL,
            indexed_volume_type VARCHAR(128) NOT NULL,
            publication_year VARCHAR(128) NOT NULL,
            article_type VARCHAR(128) NOT NULL,
            conference_type VARCHAR(128) NOT NULL,
            conference_link VARCHAR(128) NOT NULL,
            starting_page VARCHAR(128) NOT NULL,
            ending_page VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Articole științifice publicate în extenso... (BDI) */
    static async createScientificArticlesBDITable() {
        const query = `CREATE TABLE scientific_articles_bdi (
            id SERIAL,
        
            hierarchy_domains VARCHAR(128) NOT NULL,
            article_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            bdiIndexed_magazine VARCHAR(128) NOT NULL,
            publication_year VARCHAR(128) NOT NULL,
            volume VARCHAR(128) NOT NULL,
            number VARCHAR(128) NOT NULL,
            starting_page VARCHAR(128) NOT NULL,
            ending_page VARCHAR(128) NOT NULL,
            international_magazine VARCHAR(128) NOT NULL,
            cnatdcu_classification VARCHAR(128) NOT NULL,
            indexed_article_link VARCHAR(128) NOT NULL,
            bdi_database VARCHAR(128) NOT NULL,
            bdi_database_link VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
    static async createScientificBooksTable() {
        const query = `CREATE TABLE scientific_books (
            id SERIAL,
        
            hierarchy_domains VARCHAR(128) NOT NULL,
            chapter_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            book_title VARCHAR(128) NOT NULL,
            page_number VARCHAR(128) NOT NULL,
            publication_year VARCHAR(128) NOT NULL,
            publishing_house VARCHAR(128) NOT NULL,
            publication_type VARCHAR(128) NOT NULL,
            isbn VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Traduceri */
    static async createTranslationsTable() {
        const query = `CREATE TABLE translations (
            id SERIAL,
        
            hierarchy_domains VARCHAR(128) NOT NULL,
            translation_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            translated_authors VARCHAR(128) NOT NULL,
            publication_year VARCHAR(128) NOT NULL,
            publishing_house VARCHAR(128) NOT NULL,
            country VARCHAR(128) NOT NULL,
            page_number VARCHAR(128) NOT NULL,
            isbn VARCHAR(128) NOT NULL,
            translation_type VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Comunicări în manifestări științifice */
    static async createScientificCommunicationsTable() {
        const query = `CREATE TABLE scientific_communications (
            id SERIAL,
        
            authors VARCHAR(128) NOT NULL,
            communication_type VARCHAR(128) NOT NULL,
            presentation_year VARCHAR(128) NOT NULL,
            scientific_manifestation_name VARCHAR(128) NOT NULL,
            manifestation_type VARCHAR(128) NOT NULL,
            scientific_manifestation_link VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Brevete */
    static async createPatentsTable() {
        const query = `CREATE TABLE patents (
            id SERIAL,
        
            patent_title_or_cbi VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            year_of_obtaining_patent VARCHAR(128) NOT NULL,
            patent_number VARCHAR(128) NOT NULL,
            patent_type VARCHAR(128) NOT NULL,
            authority VARCHAR(128) NOT NULL,
            country VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Contracte de cercetare */
    static async createResearchContractsTable() {
        const query = `CREATE TABLE research_contracts (
            id SERIAL,
        
            research_contract_name_or_project VARCHAR(128) NOT NULL,
            project_code VARCHAR(128) NOT NULL,
            financier VARCHAR(128) NOT NULL,
            function VARCHAR(128) NOT NULL,
            start_project_period VARCHAR(128) NOT NULL,
            end_project_period VARCHAR(128) NOT NULL,
            contract_type VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Citări */
    static async createCitationsTable() {
        const query = `CREATE TABLE citations (
            id SERIAL,
        
            article_title VARCHAR(128) NOT NULL,
            authors VARCHAR(128) NOT NULL,
            publication_title_where_referenced VARCHAR(128) NOT NULL,
            authors_names_that_reference VARCHAR(128) NOT NULL,
            citation_year VARCHAR(128) NOT NULL,
            volume VARCHAR(128) NOT NULL,
            impact_factor VARCHAR(128) NOT NULL,
            issue VARCHAR(128) NOT NULL,
            article_number VARCHAR(128) NOT NULL,
            starting_page VARCHAR(128) NOT NULL,
            ending_page VARCHAR(128) NOT NULL,
            doi VARCHAR(128) NOT NULL,
            cnatdcu_classification VARCHAR(128) NOT NULL,
            citations VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Premii si nominalizari */
    static async createAwardsAndNominationsTable() {
        const query = `CREATE TABLE awards_and_nominations (
            id SERIAL,
        
            year_of_award VARCHAR(128) NOT NULL,
            award_name VARCHAR(128) NOT NULL,
            award_type VARCHAR(128) NOT NULL,
            organization_that_give_the_award VARCHAR(128) NOT NULL,
            country VARCHAR(128) NOT NULL,
            awarded_for VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Membru în academii */
    static async createAcademyMemberTable() {
        const query = `CREATE TABLE academy_member (
            id SERIAL,
        
            admission_year VARCHAR(128) NOT NULL,
            academy_name VARCHAR(128) NOT NULL,
            member_type VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Membru în echipa editorială */
    static async createEditorialMemberTable() {
        const query = `CREATE TABLE editorial_member (
            id SERIAL,
        
            committee_name VARCHAR(128) NOT NULL,
            magazine_name VARCHAR(128) NOT NULL,
            year_of_committee_attendance VARCHAR(128) NOT NULL,
            quality VARCHAR(128) NOT NULL,
            magazine_type VARCHAR(128) NOT NULL,
            national_or_international VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Evenimente organizate */
    static async createOrganizedEventsTable() {
        const query = `CREATE TABLE organized_events (
            id SERIAL,
        
            manifestation_name VARCHAR(128) NOT NULL,
            start_date VARCHAR(128) NOT NULL,
            end_date VARCHAR(128) NOT NULL,
            manifestation_place VARCHAR(128) NOT NULL,
            manifestation_type VARCHAR(128) NOT NULL,
            manifestation_classification VARCHAR(128) NOT NULL,
            manifestation_link VARCHAR(128) NOT NULL,
            contact_person VARCHAR(128) NOT NULL,
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Fără activitate științifică */
    static async createWithoutActivityTable() {
        const query = `CREATE TABLE without_activity (
            id SERIAL,
        
            observations TEXT NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }

    /** Activitate didactică */
    static async createDidacticActivityTable() {
        const query = `CREATE TABLE didactic_activity (
            id SERIAL,
        
            class_name VARCHAR(128) NOT NULL,
            activity_type VARCHAR(128) NOT NULL,
            year_of_attending_activity VARCHAR(128) NOT NULL,
        
            PRIMARY KEY (id)
        )`;

        await QueryDB(query, []);
    }
}

/** This class contains the methods for creating the table relations.
 * This should be used after all tables from DatabaseTables are created. */
abstract class DatabaseTableRelations {

    /** Informații */
    static async createUserInformationRelation() {
        const query = `CREATE TABLE user_information (
            user_id VARCHAR(30),
            information_id INTEGER,
        
            UNIQUE (user_id, information_id),
            CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            CONSTRAINT link_t FOREIGN KEY (information_id) REFERENCES information(id) ON DELETE CASCADE
        )`;

        await QueryDB(query, []);
    }

    /** Articole ştiintifice publicate în extenso...(ISI) */
    static async createUserScientificArticlesISIRelation() {
        const query = `CREATE TABLE user_information (
            user_id VARCHAR(30),
            information_id INTEGER,
        
            UNIQUE (user_id, information_id),
            CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            CONSTRAINT link_t FOREIGN KEY (information_id) REFERENCES information(id) ON DELETE CASCADE
        )`;

        await QueryDB(query, []);
    }


    /** ISI proceedings */
    static async createUserISIProceedingsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Articole științifice publicate în extenso... (BDI) */
    static async createUserScientificArticlesBDIRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
    static async createUserScientificBooksRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Traduceri */
    static async createUserTranslationsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Comunicări în manifestări științifice */
    static async createUserScientificCommunicationsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Brevete */
    static async createUserPatentsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Contracte de cercetare */
    static async createUserResearchContractsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Citări */
    static async createUserCitationsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Premii si nominalizari */
    static async createUserAwardsAndNominationsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Membru în academii */
    static async createUserAcademyMemberRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Membru în echipa editorială */
    static async createUserEditorialMemberTableRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Evenimente organizate */
    static async createUserOrganizedEventsRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Fără activitate științifică */
    static async createUserWithoutActivityRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

    /** Activitate didactică */
    static async createUserDidacticActivityRelation() {
        const query = ``;

        await QueryDB(query, []);
    }

}
