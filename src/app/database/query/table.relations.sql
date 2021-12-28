/* ----==== DROP ====---- */

DROP TABLE IF EXISTS user_information;
DROP TABLE IF EXISTS user_scientific_article_isi;
DROP TABLE IF EXISTS user_isi_proceedings;
DROP TABLE IF EXISTS user_scientific_articles_bdi;
DROP TABLE IF EXISTS user_scientific_books;
DROP TABLE IF EXISTS user_translations;
DROP TABLE IF EXISTS user_scientific_communications;
DROP TABLE IF EXISTS user_patents;
DROP TABLE IF EXISTS user_research_contracts;
DROP TABLE IF EXISTS user_citations;
DROP TABLE IF EXISTS user_awards_and_nominations;
DROP TABLE IF EXISTS user_academy_member;
DROP TABLE IF EXISTS user_editorial_member;
DROP TABLE IF EXISTS user_organized_events;
DROP TABLE IF EXISTS user_without_activity;
DROP TABLE IF EXISTS user_didactic_activity;


/* ----==== CREATE ====---- */

/* Utilizator - Informații */
CREATE TABLE user_information (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES information(id) ON DELETE CASCADE
);

/* Utilizator - Articole ştiintifice publicate în extenso...(ISI) */
CREATE TABLE user_scientific_article_isi (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES scientific_article_isi(id) ON DELETE CASCADE
);

/* Utilizator - ISI proceedings */
CREATE TABLE user_isi_proceedings (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES isi_proceedings(id) ON DELETE CASCADE
);

/* Utilizator - Articole științifice publicate în extenso... (BDI) */
CREATE TABLE user_scientific_articles_bdi (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES scientific_articles_bdi(id) ON DELETE CASCADE
);

/* Utilizator - Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
CREATE TABLE user_scientific_books (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES scientific_books(id) ON DELETE CASCADE
);

/* Utilizator - Traduceri */
CREATE TABLE user_translations (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES translations(id) ON DELETE CASCADE
);

/* Utilizator - Comunicări în manifestări științifice */
CREATE TABLE user_scientific_communications (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES scientific_communications(id) ON DELETE CASCADE
);

/* Utilizator - Brevete */
CREATE TABLE user_research_contracts (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES research_contracts(id) ON DELETE CASCADE
);

/* Utilizator - Contracte de cercetare */
CREATE TABLE user_patents (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES patents(id) ON DELETE CASCADE
);

/* Utilizator - Citări */
CREATE TABLE user_citations (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES citations(id) ON DELETE CASCADE
);

/* Utilizator - Premii si nominalizari */
CREATE TABLE user_awards_and_nominations (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES awards_and_nominations(id) ON DELETE CASCADE
);

/* Utilizator - Membru în academii */
CREATE TABLE user_academy_member (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES academy_member(id) ON DELETE CASCADE
);

/* Utilizator - Membru în echipa editorială */
CREATE TABLE user_editorial_member (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES editorial_member(id) ON DELETE CASCADE
);

/* Utilizator - Evenimente organizate */
CREATE TABLE user_organized_events (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES organized_events(id) ON DELETE CASCADE
);

/* Utilizator - Fără activitate științifică */
CREATE TABLE user_without_activity (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES without_activity(id) ON DELETE CASCADE
);

/* Utilizator - Activitate didactică */
CREATE TABLE user_didactic_activity (
    user_id INTEGER,
    relation_id INTEGER,

    UNIQUE (user_id, relation_id),
    CONSTRAINT link_u FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT link_t FOREIGN KEY (relation_id) REFERENCES didactic_activity(id) ON DELETE CASCADE
);

/* ----==== SELECT ====---- */

/* Utilizator - Informații */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_information ui ON u.id = ui.user_id
         JOIN information r ON r.id = ui.relation_id;

/* Utilizator - Articole ştiintifice publicate în extenso...(ISI) */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_scientific_article_isi ur ON u.id = ur.user_id
         JOIN scientific_article_isi r ON ur.relation_id = r.id;

/* Utilizator - ISI proceedings */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_isi_proceedings ur ON u.id = ur.user_id
         JOIN isi_proceedings r ON ur.relation_id = r.id;

/* Utilizator - Articole științifice publicate în extenso... (BDI) */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_scientific_articles_bdi ur ON u.id = ur.user_id
         JOIN scientific_articles_bdi r ON ur.relation_id = r.id;

/* Utilizator - Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_scientific_books ur ON u.id = ur.user_id
         JOIN scientific_books r ON ur.relation_id = r.id;

/* Utilizator - Traduceri */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_translations ur ON u.id = ur.user_id
         JOIN translations r ON ur.relation_id = r.id;

/* Utilizator - Comunicări în manifestări științifice */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_scientific_communications ur ON u.id = ur.user_id
         JOIN scientific_communications r ON ur.relation_id = r.id;

/* Utilizator - Brevete */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_patents ur ON u.id = ur.user_id
         JOIN patents r ON ur.relation_id = r.id;

/* Utilizator - Contracte de cercetare */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_research_contracts ur ON u.id = ur.user_id
         JOIN research_contracts r ON ur.relation_id = r.id;

/* Utilizator - Citări */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_citations ur ON u.id = ur.user_id
         JOIN citations r ON ur.relation_id = r.id;

/* Utilizator - Premii si nominalizari */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_awards_and_nominations ur ON u.id = ur.user_id
         JOIN awards_and_nominations r ON ur.relation_id = r.id;

/* Utilizator - Membru în academii */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_academy_member ur ON u.id = ur.user_id
         JOIN academy_member r ON ur.relation_id = r.id;

/* Utilizator - Membru în echipa editorială */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_editorial_member ur ON u.id = ur.user_id
         JOIN editorial_member r ON ur.relation_id = r.id;

/* Utilizator - Evenimente organizate */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_organized_events ur ON u.id = ur.user_id
         JOIN organized_events r ON ur.relation_id = r.id;

/* Utilizator - Fără activitate științifică */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_without_activity ur ON u.id = ur.user_id
         JOIN without_activity r ON ur.relation_id = r.id;

/* Utilizator - Activitate didactică */
SELECT *
FROM (SELECT * FROM users WHERE id = 1) u
         JOIN user_didactic_activity ur ON u.id = ur.user_id
         JOIN didactic_activity r ON ur.relation_id = r.id;
