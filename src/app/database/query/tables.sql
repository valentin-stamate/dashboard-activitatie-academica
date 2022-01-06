/* ----==== DROP ====---- */

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
DROP TABLE IF EXISTS authentication;
DROP TABLE IF EXISTS activation;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ids;

/* ----==== CREATE ====---- */

/* Id'uri valide. Numai utilizatorii cu acele id'uri se pot loga. */
CREATE TABLE ids (
    id SERIAL,
    identifier VARCHAR(30) UNIQUE NOT NULL ,

    PRIMARY KEY (id)
);

/* Utilizatori */
CREATE TABLE users (
    id SERIAL ,

    identifier VARCHAR(30) UNIQUE NOT NULL ,
    email VARCHAR(50) UNIQUE NOT NULL ,
    admin BOOLEAN DEFAULT FALSE NOT NULL ,
    activated BOOLEAN DEFAULT FALSE NOT NULL ,
    updated TIMESTAMP NOT NULL,

    PRIMARY KEY (id)
);

/* Activare */
CREATE TABLE activation (
    id SERIAL ,

    user_id INTEGER UNIQUE NOT NULL ,
    activation_key VARCHAR(64) NOT NULL ,

    CONSTRAINT user_ FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Auth */
CREATE TABLE authentication (
    id SERIAL ,

    user_id INTEGER UNIQUE NOT NULL ,
    auth_key VARCHAR(64) NOT NULL ,

    CONSTRAINT user_ FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Informații */
CREATE TABLE information (
    id SERIAL ,

    full_name VARCHAR(60) NOT NULL ,
    marriage_name VARCHAR(60) NOT NULL ,
    thesis_coordinator VARCHAR(60) NOT NULL ,
    founding VARCHAR(20) NOT NULL ,
    completion_date VARCHAR(30) NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Articole ştiintifice publicate în extenso...(ISI) */
CREATE TABLE scientific_article_isi (
    id SERIAL ,

    article_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    publication_date VARCHAR(30) NOT NULL ,
    volume VARCHAR(128) NOT NULL ,
    issue VARCHAR(128) NOT NULL ,
    starting_page VARCHAR(4) NOT NULL ,
    ending_page VARCHAR(4) NOT NULL ,
    impact_factor VARCHAR(128) NOT NULL ,
    cnatdcu_classification VARCHAR(128) NOT NULL ,
    doi VARCHAR(128) NOT NULL ,
    conference_name VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* ISI proceedings */
CREATE TABLE isi_proceedings (
    id SERIAL ,

    article_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    conference_name VARCHAR(128) NOT NULL ,
    indexed_volume_type VARCHAR(128) NOT NULL ,
    publication_year VARCHAR(128) NOT NULL ,
    article_type VARCHAR(128) NOT NULL ,
    conference_type VARCHAR(128) NOT NULL ,
    conference_link VARCHAR(128) NOT NULL ,
    starting_page VARCHAR(128) NOT NULL ,
    ending_page VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Articole științifice publicate în extenso... (BDI) */
CREATE TABLE scientific_articles_bdi (
    id SERIAL ,

    hierarchy_domains VARCHAR(128) NOT NULL ,
    article_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    bdi_indexed_magazine VARCHAR(128) NOT NULL ,
    publication_year VARCHAR(128) NOT NULL ,
    volume VARCHAR(128) NOT NULL ,
    number VARCHAR(128) NOT NULL ,
    starting_page VARCHAR(128) NOT NULL ,
    ending_page VARCHAR(128) NOT NULL ,
    international_magazine VARCHAR(128) NOT NULL ,
    cnatdcu_classification VARCHAR(128) NOT NULL ,
    indexed_article_link VARCHAR(128) NOT NULL ,
    bdi_database VARCHAR(128) NOT NULL ,
    bdi_database_link VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
CREATE TABLE scientific_books (
    id SERIAL ,

    hierarchy_domains VARCHAR(128) NOT NULL ,
    chapter_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    book_title VARCHAR(128) NOT NULL ,
    page_number VARCHAR(128) NOT NULL ,
    publication_year VARCHAR(128) NOT NULL ,
    publishing_house VARCHAR(128) NOT NULL ,
    publication_type VARCHAR(128) NOT NULL ,
    isbn VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Traduceri */
CREATE TABLE translations (
    id SERIAL ,

    hierarchy_domains VARCHAR(128) NOT NULL ,
    translation_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    translated_authors VARCHAR(128) NOT NULL ,
    publication_year VARCHAR(128) NOT NULL ,
    publishing_house VARCHAR(128) NOT NULL ,
    country VARCHAR(128) NOT NULL ,
    page_number VARCHAR(128) NOT NULL ,
    isbn VARCHAR(128) NOT NULL ,
    translation_type VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Comunicări în manifestări științifice */
CREATE TABLE scientific_communications (
    id SERIAL ,

    authors VARCHAR(128) NOT NULL ,
    communication_type VARCHAR(128) NOT NULL ,
    presentation_year VARCHAR(128) NOT NULL ,
    scientific_manifestation_name VARCHAR(128) NOT NULL ,
    manifestation_type VARCHAR(128) NOT NULL ,
    scientific_manifestation_link VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Brevete */
CREATE TABLE patents (
    id SERIAL ,

    patent_title_or_cbi VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    year_of_obtaining_patent VARCHAR(128) NOT NULL ,
    patent_number VARCHAR(128) NOT NULL ,
    patent_type VARCHAR(128) NOT NULL ,
    authority VARCHAR(128) NOT NULL ,
    country VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Contracte de cercetare */
CREATE TABLE research_contracts (
    id SERIAL ,

    research_contract_name_or_project VARCHAR(128) NOT NULL ,
    project_code VARCHAR(128) NOT NULL ,
    financier VARCHAR(128) NOT NULL ,
    function VARCHAR(128) NOT NULL ,
    start_project_period VARCHAR(128) NOT NULL ,
    end_project_period VARCHAR(128) NOT NULL ,
    contract_type VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Citări */
CREATE TABLE citations (
    id SERIAL ,

    article_title VARCHAR(128) NOT NULL ,
    authors VARCHAR(128) NOT NULL ,
    publication_title_where_referenced VARCHAR(128) NOT NULL ,
    authors_names_that_reference VARCHAR(128) NOT NULL ,
    citation_year VARCHAR(128) NOT NULL ,
    volume VARCHAR(128) NOT NULL ,
    impact_factor VARCHAR(128) NOT NULL ,
    issue VARCHAR(128) NOT NULL ,
    article_number VARCHAR(128) NOT NULL ,
    starting_page VARCHAR(128) NOT NULL ,
    ending_page VARCHAR(128) NOT NULL ,
    doi VARCHAR(128) NOT NULL ,
    cnatdcu_classification VARCHAR(128) NOT NULL ,
    citations VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Premii si nominalizari */
CREATE TABLE awards_and_nominations (
    id SERIAL ,

    year_of_award VARCHAR(128) NOT NULL ,
    award_name VARCHAR(128) NOT NULL ,
    award_type VARCHAR(128) NOT NULL ,
    organization_that_give_the_award VARCHAR(128) NOT NULL ,
    country VARCHAR(128) NOT NULL ,
    awarded_for VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Membru în academii */
CREATE TABLE academy_member (
    id SERIAL ,

    admission_year VARCHAR(128) NOT NULL ,
    academy_name VARCHAR(128) NOT NULL ,
    member_type VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Membru în echipa editorială */
CREATE TABLE editorial_member (
    id SERIAL ,

    committee_name VARCHAR(128) NOT NULL ,
    magazine_name VARCHAR(128) NOT NULL ,
    year_of_committee_attendance VARCHAR(128) NOT NULL ,
    quality VARCHAR(128) NOT NULL ,
    magazine_type VARCHAR(128) NOT NULL ,
    national_or_international VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Evenimente organizate */
CREATE TABLE organized_events (
    id SERIAL ,

    manifestation_name VARCHAR(128) NOT NULL ,
    start_date VARCHAR(128) NOT NULL ,
    end_date VARCHAR(128) NOT NULL ,
    manifestation_place VARCHAR(128) NOT NULL ,
    manifestation_type VARCHAR(128) NOT NULL ,
    manifestation_classification VARCHAR(128) NOT NULL ,
    manifestation_link VARCHAR(128) NOT NULL ,
    contact_person VARCHAR(128) NOT NULL ,
    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Fără activitate științifică */
CREATE TABLE without_activity (
    id SERIAL ,

    observations TEXT NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);

/* Activitate didactică */
CREATE TABLE didactic_activity (
    id SERIAL ,

    class_name VARCHAR(128) NOT NULL ,
    activity_type VARCHAR(128) NOT NULL ,
    year_of_attending_activity VARCHAR(128) NOT NULL ,
    owner INTEGER NOT NULL UNIQUE ,
    updated TIMESTAMP NOT NULL ,

    CONSTRAINT owner_ FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (id)
);