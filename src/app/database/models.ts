/* Requests */
class GraphQlError {
    constructor(public message: string, public locations: any[] = [], public path: string[] = []) { }
}

export class GraphQlResponse {
    constructor(public data: any, public errors: any = undefined) { }
}

export class GraphQlErrorResponse {
    data = null;
    errors: GraphQlError[] = [];

    constructor(errors: string[]) {
        for (const error of errors) {
            this.errors.push(new GraphQlError(error));
        }
    }
}

/* ----==== Ids ====---- */
export class Id {
    id: number;
    identifier: string;

    constructor(props: any){
        this.id = props.id;
        this.identifier = props.identifier;
    }
}

/* ----==== User ====---- */
export class User {
    id: number;
    identifier: string;
    email: string;
    admin: boolean;
    activated: boolean;
    updated: Date;

    constructor(props: any) {
        this.id = props.id;
        this.identifier = props.identifier;
        this.email = props.email;
        this.admin = props.admin;
        this.activated = props.activated;
        this.updated = props.updated;
    }
}

export class Activation {
    id: number;
    userId: number;
    activationKey: string;

    constructor(props: any) {
        this.id = props.id;
        this.userId = props.user_id;
        this.activationKey = props.activation_key;
    }
}

export class Authentication {
    id: number;
    userId: number;
    authKey: string;

    constructor(props: any) {
        this.id = props.id;
        this.userId = props.user_id;
        this.authKey = props.auth_key;
    }
}

export class AuthToken {
    constructor(public token: string) { }
}

/* ----==== Forms ====---- */
enum FormTypes {
    INFORMATION,
    SCIENTIFIC_ARTICLE_ISI,
    ISI_PROCEEDINGS,
    SCIENTIFIC_ARTICLE_BDI,
    SCIENTIFIC_BOOK,
    TRASNLATION,
    SCIENTIFIC_COMMUNICATION,
    PATENT,
    RESEARCH_CONTRACT,
    CITAION,
    AWARDS_AND_NOMINATION,
    ACADEMY_MEMBER,
    EDITORIAL_MEMBER,
    ORGANIZED_EVENT,
    WITHOUT_ACTIVITY,
    DIDACTIC_ACTIVITY,
}


/* Informații */
export class Information {
    static sheetName = 'Informații';

    static col = ['Numar Matricol', 'Nume prenume', 'Nume dupa casatorie',
        'Coordonator', 'Finantare', 'Data completarii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'fullName'],
        [this.col[2], 'marriageName'], [this.col[3], 'thesisCoordinator'],
        [this.col[4], 'founding'], [this.col[5], 'completionDate'],
        [this.col[6], 'updated']
    ]);

    id: number;
    fullName: string;
    marriageName: string;
    thesisCoordinator: string;
    founding: string;
    completionDate: Date;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'Information';

    constructor(props: any) {
        this.id = props.id;
        this.fullName = props.full_name;
        this.marriageName = props.marriage_name;
        this.thesisCoordinator = props.thesis_coordinator;
        this.founding = props.founding;
        this.completionDate = props.completion_date;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.INFORMATION;
    }
}

/* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export class ScientificArticleISI {
    static sheetName = 'Articole ştiintifice...ISI...';

    static col = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Data publicarii',
        'Volum', 'ISSUE', 'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Factor de impact',
        'Clasificare CNATDCU', 'DOI', 'Denumire conferința', 'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'articleTitle'],
        [this.col[2], 'authors'], [this.col[3], 'publicationDate'],
        [this.col[4], 'volume'], [this.col[5], 'issue'],
        [this.col[6], 'startingPage'], [this.col[7], 'endingPage'],
        [this.col[8], 'impactFactor'], [this.col[9], 'cnatdcuClassification'],
        [this.col[10], 'doi'], [this.col[11], 'conferenceName'],
        [this.col[12], 'observations'], [this.col[13], 'updated'],
    ]);

    id: number;
    articleTitle: string;
    authors: string;
    publicationDate: Date;
    volume: string;
    issue: string;
    startingPage: number;
    endingPage: number;
    impactFactor: string;
    cnatdcuClassification: string;
    doi: string;
    conferenceName: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ScientificArticleISI';

    constructor(props: any) {
        this.id = props.id;
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.publicationDate = props.publication_date;
        this.volume = props.volume;
        this.issue = props.issue;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.impactFactor = props.impact_factor;
        this.cnatdcuClassification = props.cnatdcu_classification;
        this.doi = props.doi;
        this.conferenceName = props.conference_name;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.SCIENTIFIC_ARTICLE_ISI;
    }
}

/* ISI proceedings */
export class ISIProceeding {
    static sheetName = 'ISI proceedings';

    static col = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Denumire conferinta',
        'Tip volum indexat', 'Anul publicarii', 'Tipul lucrarii', 'Tip conferinta', 'Linkul conferintei',
        'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'articleTitle'],
        [this.col[2], 'authors'], [this.col[3], 'conferenceName'],
        [this.col[4], 'indexedVolumeType'], [this.col[5], 'publicationYear'],
        [this.col[6], 'articleType'], [this.col[7], 'conferenceType'],
        [this.col[8], 'conferenceLink'], [this.col[9], 'startingPage'],
        [this.col[10], 'endingPage'], [this.col[11], 'observations'],
        [this.col[12], 'updated'],
    ]);

    id: number;
    articleTitle: string;
    authors: string;
    conferenceName: string;
    indexedVolumeType: string;
    publicationYear: number;
    articleType: string;
    conferenceType: string;
    conferenceLink: string;
    startingPage: number;
    endingPage: number;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ISIProceeding';

    constructor(props: any) {
        this.id = props.id;
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.conferenceName = props.conference_name;
        this.indexedVolumeType = props.indexed_volume_type;
        this.publicationYear = props.publication_year;
        this.articleType = props.article_type;
        this.conferenceType = props.conference_name;
        this.conferenceLink = props.conference_link;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.ISI_PROCEEDINGS;
    }
}

/* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
export class ScientificArticleBDI {
    static sheetName = 'Articole științifice...BDI..';

    static col = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul articolului', 'Autori',
        'Denumire revista indexata BDI', 'Anul publicarii', 'Volum', 'Numar',
        'Nr. pagina de start', 'Nr. pagina de sfarsit',
        'Revista internationala', 'Clasificare CNATDCU',
        'Link articol indexat', 'Baza de date BDI',
        'Linkul bazei de date BDI',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'hierarchyDomains'],
        [this.col[2], 'articleTitle'], [this.col[3], 'authors'],
        [this.col[4], 'bdiIndexedMagazine'], [this.col[5], 'publicationYear'],
        [this.col[6], 'volume'], [this.col[7], 'number'],
        [this.col[8], 'startingPage'], [this.col[9], 'endingPage'],
        [this.col[10], 'internationalMagazine'], [this.col[11], 'cnatdcuClassification'],
        [this.col[12], 'indexedArticleLink'], [this.col[13], 'bdiDatabase'],
        [this.col[14], 'bdiDatabaseLink'],
        [this.col[15], 'observations'], [this.col[16], 'updated'],
    ]);

    id: number;
    hierarchyDomains: string;
    articleTitle: string;
    authors: string;
    bdiIndexedMagazine: string;
    publicationYear: number;
    volume: string;
    number: number;
    startingPage: number;
    endingPage: number;
    internationalMagazine: string;
    cnatdcuClassification: string;
    indexedArticleLink: string;
    bdiDatabase: string;
    bdiDatabaseLink: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ScientificArticleBDI';

    constructor(props: any) {
        this.id = props.id;
        this.hierarchyDomains = props.hierarchy_domains;
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.bdiIndexedMagazine = props.bdi_indexed_magazine;
        this.publicationYear = props.publication_year;
        this.volume = props.volume;
        this.number = props.number;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.internationalMagazine = props.international_magazine;
        this.cnatdcuClassification = props.cnatdcu_classification;
        this.indexedArticleLink = props.indexed_article_link;
        this.bdiDatabase = props.bdi_database;
        this.bdiDatabaseLink = props.bdi_database_link;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.SCIENTIFIC_ARTICLE_BDI;
    }
}

/* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
export class ScientificBook {
    static sheetName = 'Cărţi ştiinţifice...';

    static col = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul capitolului', 'Autori',
        'Titlul cartii', 'Numarul de pagini', 'Anul publicarii', 'Editura',
        'Tipul publicatiei', 'ISBN',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'hierarchyDomains'],
        [this.col[2], 'chapterTitle'], [this.col[3], 'authors'],
        [this.col[4], 'bookTitle'], [this.col[5], 'pageNumber'],
        [this.col[6], 'publicationYear'], [this.col[7], 'publishingHouse'],
        [this.col[8], 'publicationType'], [this.col[9], 'isbn'],
        [this.col[10], 'observations'], [this.col[11], 'updated'],
    ]);

    id: number;
    hierarchyDomains: string;
    chapterTitle: string;
    authors: string;
    bookTitle: string;
    pageNumber: string;
    publicationYear: number;
    publishingHouse: string;
    publicationType: string;
    isbn: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ScientificBook';

    constructor(props: any) {
        this.id = props.id;
        this.hierarchyDomains = props.hierarchy_domains;
        this.chapterTitle = props.chapter_title;
        this.authors = props.authors;
        this.bookTitle = props.book_title;
        this.pageNumber = props.page_number;
        this.publicationYear = props.publication_year;
        this.publishingHouse = props.publishing_house;
        this.publicationType = props.publication_type;
        this.isbn = props.isbn;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.SCIENTIFIC_BOOK;
    }
}

/* Traduceri */
export class Translation {
    static sheetName = 'Traduceri';

    static col = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul traducerii', 'Autori',
        'Autorii tradusi', 'Anul publicarii', 'Editura', 'Tara',
        'Numarul de pagini', 'ISBN',
        'Tipul traducerii',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'hierarchyDomains'],
        [this.col[2], 'translationTitle'], [this.col[3], 'authors'],
        [this.col[4], 'translatedAuthors'], [this.col[5], 'publicationYear'],
        [this.col[6], 'publishingHouse'], [this.col[7], 'country'],
        [this.col[8], 'pageNumber'], [this.col[9], 'isbn'],
        [this.col[10], 'translationType'],
        [this.col[11], 'observations'], [this.col[12], 'updated'],
    ]);

    id: number;
    hierarchyDomains: string;
    translationTitle: string;
    authors: string;
    translatedAuthors: string;
    publicationYear: number;
    publishingHouse: string;
    country: string;
    pageNumber: number;
    isbn: string;
    translationType: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'Translation';

    constructor(props: any) {
        this.id = props.id;
        this.hierarchyDomains = props.hierarchy_domains;
        this.translationTitle = props.translation_title;
        this.authors = props.authors;
        this.translatedAuthors = props.translated_authors;
        this.publicationYear = props.publication_year;
        this.publishingHouse = props.publishing_house;
        this.country = props.country;
        this.pageNumber = props.page_number;
        this.isbn = props.isbn;
        this.translationType = props.translation_type;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.TRASNLATION;
    }
}

/* Comunicări în manifestări științifice */
export class ScientificCommunication {
    static sheetName = 'Comunicări...';

    static col = ['Numar Matricol', 'Autori', 'Tipul comunicarii', 'Anul prezentarii',
        'Denumirea manifestarii stiintifice', 'Tipul manifestarii', 'Link către site-ul manifestării',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'authors'],
        [this.col[2], 'communicationType'], [this.col[3], 'presentationYear'],
        [this.col[4], 'scientificManifestationName'], [this.col[5], 'manifestationType'],
        [this.col[6], 'scientificManifestationLink'],
        [this.col[7], 'observations'], [this.col[8], 'updated'],
    ]);

    id: number;
    authors: string;
    communicationType: string;
    presentationYear: number;
    scientificManifestationName: string;
    manifestationType: string;
    scientificManifestationLink: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ScientificCommunication';

    constructor(props: any) {
        this.id = props.id;
        this.authors = props.authors;
        this.communicationType = props.communication_type;
        this.presentationYear = props.presentation_year;
        this.scientificManifestationName = props.scientific_manifestation_name;
        this.manifestationType = props.manifestation_type;
        this.scientificManifestationLink = props.scientific_manifestation_link;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.SCIENTIFIC_COMMUNICATION;
    }

}

/* Brevete */
export class Patent {
    static sheetName = 'Brevete';

    static col = ['Numar Matricol', 'Titlul brevetului / CBI', 'Autori',
        'Anul obținerii brevetului / depunerii CBI', 'Numar brevet', 'Tipul brevetului',
        'Autoritate eminenta', 'Tara',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'patentTitleOrCBI'],
        [this.col[2], 'authors'], [this.col[3], 'yearOfObtainingPatent'],
        [this.col[4], 'patentNumber'], [this.col[5], 'patentType'],
        [this.col[6], 'authority'], [this.col[7], 'country'],
        [this.col[8], 'observations'], [this.col[9], 'updated'],
    ]);

    id: number;
    patentTitleOrCBI: string;
    authors: string;
    yearOfObtainingPatent: number;
    patentNumber: number;
    patentType: string;
    authority: string;
    country: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'Patent';

    constructor(props: any) {
        this.id = props.id;
        this.patentTitleOrCBI = props.patent_title_or_cbi;
        this.authors = props.authors;
        this.yearOfObtainingPatent = props.year_of_obtaining_patent;
        this.patentNumber = props.patent_number;
        this.patentType = props.patent_type;
        this.authority = props.authority;
        this.country = props.country;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.PATENT;
    }
}

/* Contracte de cercetare */
export class ResearchContract {
    static sheetName = 'Contracte de cercetare';

    static col = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul articolului', 'Autori',
        'Denumire revista indexata BDI', 'Anul publicarii', 'Volum', 'Numar',
        'Nr. pagina de start', 'Nr. pagina de sfarsit',
        'Revista internationala', 'Clasificare CNATDCU',
        'Link articol indexat', 'Baza de date BDI',
        'Linkul bazei de date BDI',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'hierarchyDomains'],
        [this.col[2], 'articleTitle'], [this.col[3], 'authors'],
        [this.col[4], 'bdiIndexedMagazine'], [this.col[5], 'publicationYear'],
        [this.col[6], 'volume'], [this.col[7], 'number'],
        [this.col[8], 'startingPage'], [this.col[9], 'endingPage'],
        [this.col[10], 'internationalMagazine'], [this.col[11], 'cnatdcuClassification'],
        [this.col[12], 'indexedArticleLink'], [this.col[13], 'bdiDatabase'],
        [this.col[14], 'bdiDatabaseLink'],
        [this.col[15], 'observations'], [this.col[16], 'updated'],
    ]);

    id: number;
    researchContractNameOrProject: string;
    projectCode: string;
    financier: string;
    function: string;
    startProjectPeriod: Date;
    endProjectPeriod: Date;
    contractType: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'ResearchContract';

    constructor(props: any) {
        this.id = props.id;
        this.researchContractNameOrProject = props.research_contract_name_or_project;
        this.projectCode = props.project_code;
        this.financier = props.financier;
        this.function = props.function;
        this.startProjectPeriod = props.start_project_period;
        this.endProjectPeriod = props.end_project_period;
        this.contractType = props.contract_type;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.RESEARCH_CONTRACT;
    }
}

/* Citări */
export class Citation {
    static sheetName = 'Citări';

    static col = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Titlul publicației unde este citat articolul',
        'Numele autorilor care citeaza', 'Anul citarii', 'Volum', 'Factor de impact',
        'Issue', 'Numărul articolului',
        'Nr. pagina de start', 'Nr. pagina de sfarsit',
        'Link articol indexat', 'Baza de date BDI',
        'DOI', 'Clasificare CNATDCU', 'Citari',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'articleTitle'],
        [this.col[2], 'authors'], [this.col[3], 'publicationTitleWhereReferenced'],
        [this.col[4], 'authorsNamesThatReference'], [this.col[5], 'citationYear'],
        [this.col[6], 'volume'], [this.col[7], 'impactFactor'],
        [this.col[8], 'issue'], [this.col[9], 'articleNumber'],
        [this.col[10], 'startingPage'], [this.col[11], 'endingPage'],
        [this.col[12], 'doi'], [this.col[13], 'cnatdcuClassification'],
        [this.col[14], 'citations'],
        [this.col[15], 'observations'], [this.col[16], 'updated'],
    ]);

    id: number;
    articleTitle: string;
    authors: string;
    publicationTitleWhereReferenced: string;
    authorsNamesThatReference: string;
    citationYear: number;
    volume: string;
    impactFactor: string;
    issue: string;
    articleNumber: number;
    startingPage: number;
    endingPage: number;
    doi: string;
    cnatdcuClassification: string;
    citations: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'Citation';

    constructor(props: any) {
        this.id = props.id;
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.publicationTitleWhereReferenced = props.publication_title_where_referenced;
        this.authorsNamesThatReference = props.authors_names_that_reference;
        this.citationYear = props.citation_year;
        this.volume = props.volume;
        this.impactFactor = props.impact_factor;
        this.issue = props.issue;
        this.articleNumber = props.article_number;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.doi = props.doi;
        this.cnatdcuClassification = props.cnatdcu_classification;
        this.citations = props.citations;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.CITAION;
    }
}

/* Premii si nominalizări */
export class AwardAndNomination {
    static sheetName = 'Premii si nominalizari';

    static col = ['Numar Matricol', 'Anul acordarii premiului', 'Denumirea premiului', 'Tipul premiului',
        'Organizația care a acordat premiul', 'Tara', 'Acordat pentru activitatea didactică / cercetare',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'yearOfAward'],
        [this.col[2], 'awardName'], [this.col[3], 'awardType'],
        [this.col[4], 'organizationThatGiveTheAward'], [this.col[5], 'country'],
        [this.col[6], 'awardedFor'],
        [this.col[7], 'observations'], [this.col[8], 'updated'],
    ]);

    id: number;
    yearOfAward: number;
    awardName: string;
    awardType: string;
    organizationThatGiveTheAward: string;
    country: string;
    awardedFor: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'AwardAndNomination';

    constructor(props: any) {
        this.id = props.id;
        this.yearOfAward = props.year_of_award;
        this.awardName = props.award_name;
        this.awardType = props.award_type;
        this.organizationThatGiveTheAward = props.organization_that_give_the_award;
        this.country = props.country;
        this.awardedFor = props.award_type;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.AWARDS_AND_NOMINATION;
    }
}

/* Membru în academii */
export class AcademyMember {
    static sheetName = 'Membru în academii';

    static col = ['Numar Matricol', 'Anul admiterii', 'Denumirea academiei', 'Tip membru',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'admissionYear'],
        [this.col[2], 'academyName'], [this.col[3], 'memberType'],
        [this.col[4], 'observations'], [this.col[5], 'updated'],
    ]);

    id: number;
    admissionYear: number;
    academyName: string;
    memberType: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'AcademyMember';

    constructor(props: any) {
        this.id = props.id;
        this.admissionYear = props.admission_year;
        this.academyName = props.academy_name;
        this.memberType = props.member_type;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.ACADEMY_MEMBER;
    }
}

/* Membru în echipa editorială */
export class EditorialMember {
    static sheetName = 'Membru în echipa editorială';

    static col = ['Numar Matricol', 'Denumire comitet', 'Denumire revista / editura', 'Anul intrarii în comitet',
        'Calitatea', 'Tipul revistei', 'National / International',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'committeeName'],
        [this.col[2], 'magazineName'], [this.col[3], 'yearOfCommitteeAttendance'],
        [this.col[4], 'quality'], [this.col[5], 'magazineType'],
        [this.col[6], 'nationalOrInternational'],
        [this.col[7], 'observations'], [this.col[8], 'updated'],
    ]);

    id: number;
    committeeName: string;
    magazineName: string;
    yearOfCommitteeAttendance: number;
    quality: string;
    magazineType: string;
    nationalOrInternational: string;
    observations: string;
    owner: number
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'EditorialMember';

    constructor(props: any) {
        this.id = props.id;
        this.committeeName = props.committee_name;
        this.magazineName = props.magazine_name;
        this.yearOfCommitteeAttendance = props.year_of_committee_attendance;
        this.quality = props.quality;
        this.magazineType = props.magazine_type;
        this.nationalOrInternational = props.national_or_international;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.EDITORIAL_MEMBER;
    }
}

/* Evenimente organizate */
export class OrganizedEvent {
    static sheetName = 'Evenimente organizate';

    static col = ['Numar Matricol', 'Denumirea manifestarii', 'Data de inceput', 'Data de sfarsit',
        'Locul de desfasurare', 'Tipul manifestării', 'Clasificarea manifestării în funcție de participare', 'Link-ul manifestarii',
        'Persoana de contact',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'manifestationName'],
        [this.col[2], 'startDate'], [this.col[3], 'endDate'],
        [this.col[4], 'manifestationPlace'], [this.col[5], 'manifestationType'],
        [this.col[6], 'manifestationClassification'], [this.col[7], 'manifestationLink'],
        [this.col[8], 'contactPerson'],
        [this.col[9], 'observations'], [this.col[10], 'updated'],
    ]);

    id: number;
    manifestationName: string;
    startDate: Date;
    endDate: Date;
    manifestationPlace: string;
    manifestationType: string;
    manifestationClassification: string;
    manifestationLink: string;
    contactPerson: string;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'OrganizedEvent';

    constructor(props: any) {
        this.id = props.id;
        this.manifestationName = props.manifestation_name;
        this.startDate = props.start_date;
        this.endDate = props.end_date;
        this.manifestationPlace = props.manifestation_place;
        this.manifestationType = props.manifestation_type;
        this.manifestationClassification = props.manifestation_classification;
        this.manifestationLink = props.manifestation_link;
        this.contactPerson = props.contact_person;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.ORGANIZED_EVENT;
    }
}

/* Fără activitate științifică */
export class WithoutActivity {
    static sheetName = 'Fără activitate științifică';

    static col = ['Numar Matricol',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'],
        [this.col[1], 'observations'], [this.col[2], 'updated'],
    ]);

    id: number;
    observations: string;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'WithoutActivity';

    constructor(props: any) {
        this.id = props.id;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.WITHOUT_ACTIVITY;
    }
}

/* Activitate didactică */
export class DidacticActivity {
    static sheetName = 'Activitate didactică';

    static col = ['Numar Matricol', 'Denumire disciplina', 'Tipul activitatii', 'Anul sustinerii activitatii',
        'Observatii', 'Ultima modificare'];
    static columnsMap: Map<string, string> = new Map([
        [this.col[0], 'identifier'], [this.col[1], 'className'],
        [this.col[2], 'activityType'], [this.col[3], 'yearOfAttendingActivity'],
        [this.col[4], 'updated'],
    ]);

    id: number;
    className: string;
    activityType: string;
    yearOfAttendingActivity: number;
    owner: number;
    updated: Date;

    identifier: string;

    type: number;
    __typename = 'DidacticActivity';

    constructor(props: any) {
        this.id = props.id;
        this.className = props.class_name;
        this.activityType = props.activity_type;
        this.yearOfAttendingActivity = props.year_of_attending_activity;
        this.owner = props.owner;
        this.updated = props.updated;
        this.identifier = props.identifier;
        this.type = FormTypes.DIDACTIC_ACTIVITY;
    }
}