
export class ErrorResponse {
    constructor(public message: string) { }
}

/* User */
export class User {
    id: string;
    identifier: string;
    email: string;
    password: string;
    admin: boolean;
    activated: boolean;

    constructor(payload: any) {
        this.id = payload.id;
        this.identifier = payload.identifier;
        this.email = payload.email;
        this.password = payload.password;
        this.admin = payload.admin;
        this.activated = payload.activated;
    }
}

/* Forms */

/* Informații */
export class InformationForm {
    fullName: string;
    marriageName: string;
    thesisCoordinator: string;
    founding: string;
    completionDate: string;

    constructor(props: any) {
        this.fullName = props.full_name;
        this.marriageName = props.marriage_name;
        this.thesisCoordinator = props.thesis_coordinator;
        this.founding = props.founding;
        this.completionDate = props.completion_date;
    }
}

/* Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export class ScientificArticlesISI {
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

    constructor(props: any) {
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.publicationDate = props.publication_date;
        this.volume = props.volume;
        this.issue = props.issue;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.impactFactor = props.impact_pactor;
        this.cnatdcuClassification = props.cnatdcu_classification;
        this.doi = props.doi;
        this.conferenceName = props.conference_name;
        this.observations = props.observations;
    }
}

/* ISI proceedings */
export class ISIProceedings {
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

    constructor(props: any) {
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.conferenceName = props.conference_name;
        this.indexedVolumeType = props.indexed_volume_type;
        this.publicationYear = props.publication_date;
        this.articleType = props.article_type;
        this.conferenceType = props.conference_name;
        this.conferenceLink = props.conference_link;
        this.startingPage = props.starting_page;
        this.endingPage = props.ending_page;
        this.observations = props.observations;
    }
}

/* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
export class ScientificArticlesBDI {
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

    constructor(props: any) {
        this.hierarchyDomains = props.hierarchy_domains;
        this.articleTitle = props.article_title;
        this.authors = props.authors;
        this.bdiIndexedMagazine = props.bdiIndexed_magazine;
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
    }
}

/* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */
export class ScientificBooks {
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

    constructor(props: any) {
        this.hierarchyDomains = props.hierarchy_domains;
        this.chapterTitle = props.chapter_name;
        this.authors = props.authors;
        this.bookTitle = props.book_title;
        this.pageNumber = props.page_number;
        this.publicationYear = props.publication_year;
        this.publishingHouse = props.publishing_house;
        this.publicationType = props.publication_type;
        this.isbn = props.isbn;
        this.observations = props.observations;
    }
}

/* Traduceri */
export class Translations {
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

    constructor(props: any) {
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
    }
}

/* Comunicări în manifestări științifice */
export class ScientificCommunications {
    authors: string;
    communicationType: string;
    presentationYear: string;
    scientificManifestationName: string;
    manifestationType: string;
    scientificManifestationLink: string;
    observations: string;

    constructor(props: any) {
        this.authors = props.authors;
        this.communicationType = props.communication_type;
        this.presentationYear = props.presentation_year;
        this.scientificManifestationName = props.scientific_manifestation_name;
        this.manifestationType = props.manifestation_type;
        this.scientificManifestationLink = props.scientific_manifestation_link;
        this.observations = props.observations;
    }

}

/* Brevete */
export class Patents {
    patentTitleOrCBI: string;
    authors: string;
    yearOfObtainingPatent: string;
    patentNumber: string;
    patentType: string;
    authority: string;
    country: string;
    observations: string;

    constructor(props: any) {
        this.patentTitleOrCBI = props.patent_title_or_cbi;
        this.authors = props.authors;
        this.yearOfObtainingPatent = props.year_of_obtaining_patent;
        this.patentNumber = props.patent_number;
        this.patentType = props.patent_type;
        this.authority = props.authority;
        this.country = props.country;
        this.observations = props.observations;
    }
}

/* Contracte de cercetare */
export class ResearchContracts {
    researchContractNameOrProject: string;
    projectCode: string;
    financier: string;
    function: string;
    startProjectPeriod: string;
    endProjectPeriod: string;
    contractType: string;
    observations: string;

    constructor(props: any) {
        this.researchContractNameOrProject = props.research_contract_name_or_project;
        this.projectCode = props.project_code;
        this.financier = props.financier;
        this.function = props.function;
        this.startProjectPeriod = props.start_project_period;
        this.endProjectPeriod = props.end_project_period;
        this.contractType = props.contract_type;
        this.observations = props.observations;
    }
}

/* Citări */
export class Citations {
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

    constructor(props: any) {
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
    }
}

/* Premii si nominalizari */
export class AwardsAndNominations {
    yearOfAward: string;
    awardName: string;
    awardType: string;
    organizationThatGiveTheAward: string;
    country: string;
    awardedFor: string;
    observations: string;

    constructor(props: any) {
        this.yearOfAward = props.year_of_award;
        this.awardName = props.award_name;
        this.awardType = props.award_type;
        this.organizationThatGiveTheAward = props.organization_that_give_the_award;
        this.country = props.country;
        this.awardedFor = props.award_type;
        this.observations = props.observations;
    }
}

/* Membru în academii */
export class AcademyMember {
    admissionYear: string;
    academyName: string;
    memberType: string;
    observations: string;

    constructor(props: any) {
        this.admissionYear = props.admission_year;
        this.academyName = props.academy_name;
        this.memberType = props.member_type;
        this.observations = props.observations;
    }
}

/* Membru în echipa editorială */
export class EditorialMember {
    committeeName: string;
    magazineName: string;
    yearOfCommitteeAttendance: string;
    quality: string;
    magazineType: string;
    nationalOrInternational: string;
    observations: string;

    constructor(props: any) {
        this.committeeName = props.committee_name;
        this.magazineName = props.magazine_name;
        this.yearOfCommitteeAttendance = props.year_of_committee_attendance;
        this.quality = props.quality;
        this.magazineType = props.magazine_type;
        this.nationalOrInternational = props.national_or_international;
        this.observations = props.observations;
    }
}

/* Evenimente organizate */
export class OrganizedEvents {
    manifestationName: string;
    startDate: string;
    endDate: string;
    manifestationPlace: string;
    manifestationType: string;
    manifestationClassification: string;
    manifestationLink: string;
    contactPerson: string;
    observations: string;

    constructor(props: any) {
        this.manifestationName = props.manifestation_name;
        this.startDate = props.start_date;
        this.endDate = props.end_date;
        this.manifestationPlace = props.manifestation_place;
        this.manifestationType = props.manifestation_type;
        this.manifestationClassification = props.manifestation_classification;
        this.manifestationLink = props.manifestation_link;
        this.contactPerson = props.contact_person;
        this.observations = props.observations;
    }
}

/* Fără activitate științifică */
export class WithoutActivity {
    observations: string;

    constructor(props: any) {
        this.observations = props.observations;
    }
}

/* Activitate didactică */
export class DidacticActivity {
    className: string;
    activityType: string;
    yearOfAttendingActivity: string;

    constructor(props: any) {
        this.className = props.class_name;
        this.activityType = props.activity_type;
        this.yearOfAttendingActivity = props.year_of_attending_activity;
    }
}