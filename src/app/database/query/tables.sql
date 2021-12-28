/* ----==== DROP ====---- */

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS information;
DROP TABLE IF EXISTS scientific_article_isi;
DROP TABLE IF EXISTS isi_proceedings;
DROP TABLE IF EXISTS scientific_articles_bdi;
DROP TABLE IF EXISTS scientific_books;
DROP TABLE IF EXISTS translations;
DROP TABLE IF EXISTS scientific_communications;
DROP TABLE IF EXISTS patents;
DROP TABLE IF EXISTS research_contracts;
DROP TABLE IF EXISTS citations;
DROP TABLE IF EXISTS awards_and_nominations;
DROP TABLE IF EXISTS academy_member;
DROP TABLE IF EXISTS editorial_member;
DROP TABLE IF EXISTS organized_events;
DROP TABLE IF EXISTS without_activity;
DROP TABLE IF EXISTS didactic_activity;

/* ----==== CREATE ====---- */

/* Utilizatori */
CREATE TABLE users (
    id SERIAL,

    identifier VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    admin BOOLEAN DEFAULT FALSE NOT NULL,
    activated BOOLEAN DEFAULT FALSE NOT NULL,

    PRIMARY KEY (id)
);

/* Informații */
CREATE TABLE information (
    id SERIAL,

    full_name VARCHAR(60) NOT NULL,
    marriage_name VARCHAR(60) NOT NULL,
    thesis_coordinator VARCHAR(60) NOT NULL,
    founding VARCHAR(20) NOT NULL,
    completion_date VARCHAR(30) NOT NULL,

    PRIMARY KEY (id)
);

/* Articole ştiintifice publicate în extenso...(ISI) */
CREATE TABLE scientific_article_isi (
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
);

/* ISI proceedings */
CREATE TABLE isi_proceedings (
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
);

/* Articole științifice publicate în extenso... (BDI) */
CREATE TABLE scientific_articles_bdi (
    id SERIAL,

    hierarchy_domains VARCHAR(128) NOT NULL,
    article_title VARCHAR(128) NOT NULL,
    authors VARCHAR(128) NOT NULL,
    bdi_indexed_magazine VARCHAR(128) NOT NULL,
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
);

/* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
CREATE TABLE scientific_books (
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
);

/* Traduceri */
CREATE TABLE translations (
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
);

/* Comunicări în manifestări științifice */
CREATE TABLE scientific_communications (
    id SERIAL,

    authors VARCHAR(128) NOT NULL,
    communication_type VARCHAR(128) NOT NULL,
    presentation_year VARCHAR(128) NOT NULL,
    scientific_manifestation_name VARCHAR(128) NOT NULL,
    manifestation_type VARCHAR(128) NOT NULL,
    scientific_manifestation_link VARCHAR(128) NOT NULL,
    observations TEXT NOT NULL,

    PRIMARY KEY (id)
);

/* Brevete */
CREATE TABLE patents (
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
);

/* Contracte de cercetare */
CREATE TABLE research_contracts (
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
);

/* Citări */
CREATE TABLE citations (
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
);

/* Premii si nominalizari */
CREATE TABLE awards_and_nominations (
    id SERIAL,

    year_of_award VARCHAR(128) NOT NULL,
    award_name VARCHAR(128) NOT NULL,
    award_type VARCHAR(128) NOT NULL,
    organization_that_give_the_award VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    awarded_for VARCHAR(128) NOT NULL,
    observations TEXT NOT NULL,

    PRIMARY KEY (id)
);

/* Membru în academii */
CREATE TABLE academy_member (
    id SERIAL,

    admission_year VARCHAR(128) NOT NULL,
    academy_name VARCHAR(128) NOT NULL,
    member_type VARCHAR(128) NOT NULL,
    observations TEXT NOT NULL,

    PRIMARY KEY (id)
);

/* Membru în echipa editorială */
CREATE TABLE editorial_member (
    id SERIAL,

    committee_name VARCHAR(128) NOT NULL,
    magazine_name VARCHAR(128) NOT NULL,
    year_of_committee_attendance VARCHAR(128) NOT NULL,
    quality VARCHAR(128) NOT NULL,
    magazine_type VARCHAR(128) NOT NULL,
    national_or_international VARCHAR(128) NOT NULL,
    observations TEXT NOT NULL,

    PRIMARY KEY (id)
);

/* Evenimente organizate */
CREATE TABLE organized_events (
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
);

/* Fără activitate științifică */
CREATE TABLE without_activity (
    id SERIAL,

    observations TEXT NOT NULL,

    PRIMARY KEY (id)
);

/* Activitate didactică */
CREATE TABLE didactic_activity (
    id SERIAL,

    class_name VARCHAR(128) NOT NULL,
    activity_type VARCHAR(128) NOT NULL,
    year_of_attending_activity VARCHAR(128) NOT NULL,

    PRIMARY KEY (id)
);

/* ----==== INSERT ====---- */
INSERT INTO users(identifier, email, password) VALUES ('', '', '');
INSERT INTO information(full_name, marriage_name, thesis_coordinator, founding, completion_date) VALUES ('', '', '', '', '');
INSERT INTO scientific_article_isi(article_title, authors, publication_date, volume, issue, starting_page, ending_page, impact_factor, cnatdcu_classification, doi, conference_name, observations) VALUES ('', '', '', '', '', '', '', '', '', '', '', '');
INSERT INTO isi_proceedings(article_title, authors, conference_name, indexed_volume_type, publication_year, article_type, conference_type, conference_link, starting_page, ending_page, observations) VALUES ('', '', '', '', '', '', '', '', '', '', '');
INSERT INTO scientific_articles_bdi(hierarchy_domains, article_title, authors, bdi_indexed_magazine, publication_year, volume, number, starting_page, ending_page, international_magazine, cnatdcu_classification, indexed_article_link, bdi_database, bdi_database_link, observations) VALUES ('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
INSERT INTO scientific_books(hierarchy_domains, chapter_title, authors, book_title, page_number, publication_year, publishing_house, publication_type, isbn, observations) VALUES ('', '', '', '', '', '', '', '', '', '');
INSERT INTO translations(hierarchy_domains, translation_title, authors, translated_authors, publication_year, publishing_house, country, page_number, isbn, translation_type, observations) VALUES('', '', '', '', '', '', '', '', '', '', '');
INSERT INTO scientific_communications(authors, communication_type, presentation_year, scientific_manifestation_name, manifestation_type, scientific_manifestation_link, observations) VALUES ('', '', '', '', '', '', '');
INSERT INTO patents(patent_title_or_cbi, authors, year_of_obtaining_patent, patent_number, patent_type, authority, country, observations) VALUES ('', '', '', '', '', '', '', '');
INSERT INTO research_contracts(research_contract_name_or_project, project_code, financier, function, start_project_period, end_project_period, contract_type, observations) VALUES ('', '', '', '', '', '', '', '');
INSERT INTO citations(article_title, authors, publication_title_where_referenced, authors_names_that_reference, citation_year, volume, impact_factor, issue, article_number, starting_page, ending_page, doi, cnatdcu_classification, citations, observations) VALUES ('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
INSERT INTO awards_and_nominations(year_of_award, award_name, award_type, organization_that_give_the_award, country, awarded_for, observations) VALUES ('', '', '', '', '', '', '');
INSERT INTO academy_member(admission_year, academy_name, member_type, observations) VALUES ('', '', '', '');
INSERT INTO editorial_member(committee_name, magazine_name, year_of_committee_attendance, quality, magazine_type, national_or_international, observations) VALUES ('', '', '', '', '', '', '');
INSERT INTO organized_events(manifestation_name, start_date, end_date, manifestation_place, manifestation_type, manifestation_classification, manifestation_link, contact_person, observations) VALUES ('', '', '', '', '', '', '', '', '');
INSERT INTO without_activity(observations) VALUES ('');
INSERT INTO didactic_activity(class_name, activity_type, year_of_attending_activity) VALUES ('', '', '');