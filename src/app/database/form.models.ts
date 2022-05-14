/** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export interface ScientificArticleISI {
    owner: string;

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

    id: number;
    updatedAt: Date;
    createdAt: Date;
}

/** ISI proceedings */
export interface ISIProceeding {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
export interface ScientificArticleBDI {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
export interface ScientificBook {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Traduceri */
export interface Translation {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Comunicări în manifestări științifice */
export interface ScientificCommunication {
    owner: string;

    id: number;
    authors: string;
    communicationType: string;
    presentationYear: number;
    scientificManifestationName: string;
    manifestationType: string;
    scientificManifestationLink: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Brevete */
export interface Patent {
    owner: string;

    id: number;
    patentTitleOrCBI: string;
    authors: string;
    yearOfObtainingPatent: number;
    patentNumber: number;
    patentType: string;
    authority: string;
    country: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Contracte de cercetare */
export interface ResearchContract {
    owner: string;

    id: number;
    researchContractNameOrProject: string;
    projectCode: string;
    financier: string;
    function: string;
    startProjectPeriod: Date;
    endProjectPeriod: Date;
    contractType: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Citări */
export interface Citation {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Premii si nominalizări */
export interface AwardAndNomination {
    owner: string;

    id: number;
    yearOfAward: number;
    awardName: string;
    awardType: string;
    organizationThatGiveTheAward: string;
    country: string;
    awardedFor: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Membru în academii */
export interface AcademyMember {
    owner: string;

    id: number;
    admissionYear: number;
    academyName: string;
    memberType: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Membru în echipa editorială */
export interface EditorialMember {
    owner: string;

    id: number;
    committeeName: string;
    magazineName: string;
    yearOfCommitteeAttendance: number;
    quality: string;
    magazineType: string;
    nationalOrInternational: string;
    observations: string;

    updatedAt: Date;
    createdAt: Date;
}

/** Evenimente organizate */
export interface OrganizedEvent {
    owner: string;

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

    updatedAt: Date;
    createdAt: Date;
}

/** Fără activitate științifică */
export interface WithoutActivity {

    id: number;
    observations: string;

    owner: string;
    updatedAt: Date;
    createdAt: Date;
}

/** Activitate didactică */
export interface DidacticActivity {
    sheetName: 'Activitate didactică';

    header: ['Denumire disciplina', 'Tipul activitatii', 'Anul sustinerii activitatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];

    id: number;
    className: string;
    activityType: string;
    yearOfAttendingActivity: number;

    owner: string;
    updatedAt: Date;
    createdAt: Date;
}