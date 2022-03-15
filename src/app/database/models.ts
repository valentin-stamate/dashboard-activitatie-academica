import { Model } from "@sequelize/core/types";

export interface BaseInformation {
    id: number;
    fullName: string;
    identifier: string;
    founding: string;
    coordinator: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: number;
    identifier: string;
    email: string;
    alternativeEmail: string;
    admin: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export interface UserKey {
    id: number;
    identifier: string;
    key: string;

    createdAt: Date;
    updatedAt: Date;
}

/************************************************************************************
 *                               Forms
 ***********************************************************************************/

/** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export class ScientificArticleISISheet {
    static sheetName = 'Articole ştiintifice...ISI...';

    static header = ['Titlul articolului', 'Autori', 'Data publicarii',
        'Volum', 'ISSUE', 'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Factor de impact',
        'Clasificare CNATDCU', 'DOI', 'Denumire conferința', 'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class ISIProceedingSheet {
    static sheetName = 'ISI proceedings';

    static header = ['Titlul articolului', 'Autori', 'Denumire conferinta',
        'Tip volum indexat', 'Anul publicarii', 'Tipul lucrarii', 'Tip conferinta', 'Linkul conferintei',
        'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class ScientificArticleBDISheet {
    static sheetName = 'Articole științifice...BDI..';

    static header = ['Domenii de ierarhizare', 'Titlul articolului', 'Autori',
        'Denumire revista indexata BDI', 'Anul publicarii', 'Volum', 'Numar',
        'Nr. pagina de start', 'Nr. pagina de sfarsit',
        'Revista internationala', 'Clasificare CNATDCU',
        'Link articol indexat', 'Baza de date BDI',
        'Linkul bazei de date BDI',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class ScientificBookSheet {
    static sheetName = 'Cărţi ştiinţifice...';

    static header = ['Domenii de ierarhizare', 'Titlul capitolului', 'Autori',
        'Titlul cartii', 'Numarul de pagini', 'Anul publicarii', 'Editura',
        'Tipul publicatiei', 'ISBN',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class TranslationSheet {
    static sheetName = 'Traduceri';

    static header = ['Domenii de ierarhizare', 'Titlul traducerii', 'Autori',
        'Autorii tradusi', 'Anul publicarii', 'Editura', 'Tara',
        'Numarul de pagini', 'ISBN',
        'Tipul traducerii',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class ScientificCommunicationSheet {
    static sheetName = 'Comunicări...';

    static header = ['Autori', 'Tipul comunicarii', 'Anul prezentarii',
        'Denumirea manifestarii stiintifice', 'Tipul manifestarii', 'Link către site-ul manifestării',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class PatentSheet {
    static sheetName = 'Brevete';

    static header = ['Titlul brevetului / CBI', 'Autori',
        'Anul obținerii brevetului / depunerii CBI', 'Numar brevet', 'Tipul brevetului',
        'Autoritate eminenta', 'Tara',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class ResearchContractSheet {
    static sheetName = 'Contracte de cercetare';

    static header = ['Denumire contract de cercetare / proiect', 'Cod proiect', 'Finanțator',
        'Funcție', 'Perioada de start a proiectului', 'Perioada de sfarsit a proiectului', 'Tipul contractului',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class CitationSheet {
    static sheetName = 'Citări';

    static header = ['Titlul articolului', 'Autori', 'Titlul publicației unde este citat articolul',
        'Numele autorilor care citeaza', 'Anul citarii', 'Volum', 'Factor de impact',
        'Issue', 'Numărul articolului',
        'Nr. pagina de start', 'Nr. pagina de sfarsit',
        'Link articol indexat', 'Baza de date BDI',
        'DOI', 'Clasificare CNATDCU', 'Citari',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class AwardAndNominationSheet {
    static sheetName = 'Premii si nominalizari';

    static header = ['Anul acordarii premiului', 'Denumirea premiului', 'Tipul premiului',
        'Organizația care a acordat premiul', 'Tara', 'Acordat pentru activitatea didactică / cercetare',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class AcademyMemberSheet {
    static sheetName = 'Membru în academii';

    static header = ['Anul admiterii', 'Denumirea academiei', 'Tip membru',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class EditorialMemberSheet {
    static sheetName = 'Membru în echipa editorială';

    static header = ['Denumire comitet', 'Denumire revista / editura', 'Anul intrarii în comitet',
        'Calitatea', 'Tipul revistei', 'National / International',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class OrganizedEventSheet {
    static sheetName = 'Evenimente organizate';

    static header = ['Denumirea manifestarii', 'Data de inceput', 'Data de sfarsit',
        'Locul de desfasurare', 'Tipul manifestării', 'Clasificarea manifestării în funcție de participare', 'Link-ul manifestarii',
        'Persoana de contact',
        'Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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
export class WithoutActivitySheet {
    static sheetName = 'Fără activitate științifică';

    static header = ['Observatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

export interface WithoutActivity {

    id: number;
    observations: string;
    
    owner: string;
    updatedAt: Date;
    createdAt: Date;
}

/** Activitate didactică */
export class DidacticActivitySheet {
    static sheetName = 'Activitate didactică';

    static header = ['Denumire disciplina', 'Tipul activitatii', 'Anul sustinerii activitatii', 'Ultima modificare', 'Data crearii', 'Numar Matricol'];
}

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