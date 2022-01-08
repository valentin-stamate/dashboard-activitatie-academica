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
    id: number;
    fullName: string;
    marriageName: string;
    thesisCoordinator: string;
    founding: string;
    completionDate: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.INFORMATION;
    }
}

/* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export class ScientificArticleISI {
    id: number;
    articleTitle: string;
    authors: string;
    publicationDate: string;
    volume: string;
    issue: string;
    startingPage: string;
    endingPage: string;
    impactFactor: string;
    cnatdcuClassification: string;
    doi: string;
    conferenceName: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.SCIENTIFIC_ARTICLE_ISI;
    }
}

/* ISI proceedings */
export class ISIProceeding {
    id: number;
    articleTitle: string;
    authors: string;
    conferenceName: string;
    indexedVolumeType: string;
    publicationYear: string;
    articleType: string;
    conferenceType: string;
    conferenceLink: string;
    startingPage: string;
    endingPage: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.ISI_PROCEEDINGS;
    }
}

/* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
export class ScientificArticleBDI {
    id: number;
    hierarchyDomains: string;
    articleTitle: string;
    authors: string;
    bdiIndexedMagazine: string;
    publicationYear: string;
    volume: string;
    number: string;
    startingPage: string;
    endingPage: string;
    internationalMagazine: string;
    cnatdcuClassification: string;
    indexedArticleLink: string;
    bdiDatabase: string;
    bdiDatabaseLink: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.SCIENTIFIC_ARTICLE_BDI;
    }
}

/* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
export class ScientificBook {
    id: number;
    hierarchyDomains: string;
    chapterTitle: string;
    authors: string;
    bookTitle: string;
    pageNumber: string;
    publicationYear: string;
    publishingHouse: string;
    publicationType: string;
    isbn: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.SCIENTIFIC_BOOK;
    }
}

/* Traduceri */
export class Translation {
    id: number;
    hierarchyDomains: string;
    translationTitle: string;
    authors: string;
    translatedAuthors: string;
    publicationYear: string;
    publishingHouse: string;
    country: string;
    pageNumber: string;
    isbn: string;
    translationType: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.TRASNLATION;
    }
}

/* Comunicări în manifestări științifice */
export class ScientificCommunication {
    id: number;
    authors: string;
    communicationType: string;
    presentationYear: string;
    scientificManifestationName: string;
    manifestationType: string;
    scientificManifestationLink: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.SCIENTIFIC_COMMUNICATION;
    }

}

/* Brevete */
export class Patent {
    id: number;
    patentTitleOrCBI: string;
    authors: string;
    yearOfObtainingPatent: string;
    patentNumber: string;
    patentType: string;
    authority: string;
    country: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.PATENT;
    }
}

/* Contracte de cercetare */
export class ResearchContract {
    id: number;
    researchContractNameOrProject: string;
    projectCode: string;
    financier: string;
    function: string;
    startProjectPeriod: string;
    endProjectPeriod: string;
    contractType: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.RESEARCH_CONTRACT;
    }
}

/* Citări */
export class Citation {
    id: number;
    articleTitle: string;
    authors: string;
    publicationTitleWhereReferenced: string;
    authorsNamesThatReference: string;
    citationYear: string;
    volume: string;
    impactFactor: string;
    issue: string;
    articleNumber: string;
    startingPage: string;
    endingPage: string;
    doi: string;
    cnatdcuClassification: string;
    citations: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.CITAION;
    }
}

/* Premii si nominalizări */
export class AwardAndNomination {
    id: number;
    yearOfAward: string;
    awardName: string;
    awardType: string;
    organizationThatGiveTheAward: string;
    country: string;
    awardedFor: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.AWARDS_AND_NOMINATION;
    }
}

/* Membru în academii */
export class AcademyMember {
    id: number;
    admissionYear: string;
    academyName: string;
    memberType: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.ACADEMY_MEMBER;
    }
}

/* Membru în echipa editorială */
export class EditorialMember {
    id: number;
    committeeName: string;
    magazineName: string;
    yearOfCommitteeAttendance: string;
    quality: string;
    magazineType: string;
    nationalOrInternational: string;
    observations: string;
    owner: number
    updated: Date;

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
        this.type = FormTypes.EDITORIAL_MEMBER;
    }
}

/* Evenimente organizate */
export class OrganizedEvent {
    id: number;
    manifestationName: string;
    startDate: string;
    endDate: string;
    manifestationPlace: string;
    manifestationType: string;
    manifestationClassification: string;
    manifestationLink: string;
    contactPerson: string;
    observations: string;
    owner: number;
    updated: Date;

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
        this.type = FormTypes.ORGANIZED_EVENT;
    }
}

/* Fără activitate științifică */
export class WithoutActivity {
    id: number;
    observations: string;
    owner: number;
    updated: Date;

    type: number;
    __typename = 'WithoutActivity';

    constructor(props: any) {
        this.id = props.id;
        this.observations = props.observations;
        this.owner = props.owner;
        this.updated = props.updated;
        this.type = FormTypes.WITHOUT_ACTIVITY;
    }
}

/* Activitate didactică */
export class DidacticActivity {
    id: number;
    className: string;
    activityType: string;
    yearOfAttendingActivity: string;
    owner: number;
    updated: Date;

    type: number;
    __typename = 'DidacticActivity';

    constructor(props: any) {
        this.id = props.id;
        this.className = props.class_name;
        this.activityType = props.activity_type;
        this.yearOfAttendingActivity = props.year_of_attending_activity;
        this.owner = props.owner;
        this.updated = props.updated;
        this.type = FormTypes.DIDACTIC_ACTIVITY;
    }
}