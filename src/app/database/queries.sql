/* ----------============ Tables ============---------- */
DROP TABLE users;
DROP TABLE information;
DROP TABLE scientific_article_isi;
DROP TABLE isi_proceedings;
DROP TABLE scientific_articles_bdi;
DROP TABLE scientific_books;
DROP TABLE translations;
DROP TABLE scientific_communications;
DROP TABLE patents;
DROP TABLE research_contracts;
DROP TABLE citations;
DROP TABLE awards_and_nominations;
DROP TABLE academy_member;
DROP TABLE editorial_member;
DROP TABLE organized_events;
DROP TABLE without_activity;
DROP TABLE didactic_activity;

DROP TABLE user_information;

/* Utilizatori */
CREATE TABLE users (
    id SERIAL,

    user_id VARCHAR(30) UNIQUE NOT NULL,
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

/* ----------============ Link Tables ============---------- */
CREATE TABLE user_information (
    user_id VARCHAR(30),
    information_id INTEGER,

    UNIQUE (user_id, information_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (information_id) REFERENCES information(id) ON DELETE CASCADE
);

/* ----------============ Examples ============---------- */
INSERT INTO users(user_id, email, password) VALUES ('valentin', 'valentin@gmail.com', '123456789');
INSERT INTO information(full_name, marriage_name, thesis_coordinator, founding, completion_date) VALUES ('name', 'marria', 'thess', 'taxa', 'azi');
INSERT INTO user_information(user_id, form_id) VALUES ('valentin', 1);

SELECT * FROM user_information;
SELECT * FROM information;
SELECT * FROM users;

SELECT i.id, i.full_name, i.marriage_name, i.thesis_coordinator, i.founding, i.completion_date
FROM (SELECT * FROM users WHERE user_id = 'valentin') u
JOIN user_information ui ON u.user_id = ui.user_id
JOIN information i ON i.id = ui.form_id;


