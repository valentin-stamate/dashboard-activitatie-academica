DROP TABLE IF EXISTS user_information;
DROP TABLE IF EXISTS user_scientific_article_isi;
DROP TABLE IF EXISTS user_isi_proceedings;
DROP TABLE IF EXISTS user_scientific_articles_bdi;
DROP TABLE IF EXISTS user_scientific_books;
DROP TABLE IF EXISTS user_translations;
DROP TABLE IF EXISTS user_scientific_communications;
DROP TABLE IF EXISTS user_research_contracts;
DROP TABLE IF EXISTS user_patents;
DROP TABLE IF EXISTS user_citations;
DROP TABLE IF EXISTS user_awards_and_nominations;
DROP TABLE IF EXISTS user_academy_member;
DROP TABLE IF EXISTS user_editorial_member;
DROP TABLE IF EXISTS user_organized_events;
DROP TABLE IF EXISTS user_without_activity;
DROP TABLE IF EXISTS user_didactic_activity;

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