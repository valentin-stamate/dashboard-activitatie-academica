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