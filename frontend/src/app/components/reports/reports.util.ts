enum ReportTypes {
  /* Student Reports */
  SCIENTIFIC_ARTICLE_ISI = 'Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact',
  ISI_PROCEEDINGS = 'ISI proceedings',
  SCIENTIFIC_ARTICLE_BDI = 'Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate',
  SCIENTIFIC_BOOKS = 'Cărți ştiinţifice sau capitole de cărți publicate în edituri',
  TRANSLATIONS = 'Traduceri',
  SCIENTIFIC_COMMUNICATIONS = 'Comunicări în manifestări științifice',
  PATENTS = 'Brevete',
  RESEARCH_CONTRACTS = 'Contracte de cercetare',
  CITATIONS = 'Citări',
  AWARDS_AND_NOMINATIONS = 'Premii și nominalizări',
  ACADEMY_MEMBER = 'Membru în academii',
  EDITORIAL_MEMBER  = 'Membru în echipa editorială',
  ORGANIZED_EVENTS = 'Evenimente organizate',
  WITHOUT_ACTIVITY = 'Fără activitate științifică',
  DIDACTIC_ACTIVITY = 'Activitate didactică',

  /* Coordinator Reports */
  COORDINATOR_SCIENTIFIC_ACTIVITY = 'Activitatea științifică a conducatorului de doctorat',
  COORDINATOR_REFERENTIAL_ACTIVITY = 'Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC',
}

export class ReportsUtil {

  static studentReports: string[] = [
    ReportTypes.SCIENTIFIC_ARTICLE_ISI,
    ReportTypes.ISI_PROCEEDINGS,
    ReportTypes.SCIENTIFIC_ARTICLE_BDI,
    ReportTypes.SCIENTIFIC_BOOKS,
    ReportTypes.TRANSLATIONS,
    ReportTypes.SCIENTIFIC_COMMUNICATIONS,
    ReportTypes.PATENTS,
    ReportTypes.RESEARCH_CONTRACTS,
    ReportTypes.CITATIONS,
    ReportTypes.AWARDS_AND_NOMINATIONS,
    ReportTypes.ACADEMY_MEMBER,
    ReportTypes.EDITORIAL_MEMBER,
    ReportTypes.ORGANIZED_EVENTS,
    ReportTypes.WITHOUT_ACTIVITY,
    ReportTypes.DIDACTIC_ACTIVITY,
  ];

  static coordinatorReports: string[] = [
    ReportTypes.COORDINATOR_SCIENTIFIC_ACTIVITY,
    ReportTypes.COORDINATOR_REFERENTIAL_ACTIVITY,
  ];

  static Founding: string[] = [
    'Buget', 'Taxă'
  ];

  static IndexedVolumeTypes: string[] = [
    'Volum în BDI', 'Volum în Non-BDI',
  ];

  static CnatdcuClassification: string[] = [
    'A*', 'A', 'B', 'C', 'D',
  ];

  static NationalInternationalFem: string[] = [
    'Națională', 'Internațională',
  ];

  static NationalInternationalMasc: string[] = [
    'Național', 'Internațional',
  ];

  static YesNo: string[] = [
    'Da', 'Nu',
  ];

  static MagazineType: string[] = [
    'ISI', 'BDI', 'ALTUL',
  ];

  static Quality: string[] = [
    'A = Membrii în comitetele redacționale ale unor reviste internaționale',
    'B = Recenzenți ai unor edituri de prestigiu',
    'C = Poziții de conducere în societăți științifice',
  ];

  static BDIDatabases: string[] = [
    'ACM',
    'CAB',
    'Cabell\'s Directory of Publishing Opportunities',
    'CABI',
    'Cairn',
    'CEEOL',
    'Compendex',
    'Copernicus',
    'CrossRef',
    'CSA (Biological Sciences, Francis)',
    'DBLP',
    'DOAJ',
    'DOCTRINAL',
    'EBSCO',
    'ECOLIT',
    'EconLit',
    'ECSS',
    'Emerald',
    'Engineering Village',
    'ERIC',
    'ERIH',
    'FACHPORTAL PAEDAGOGIK',
    'Genamics Journal Seek',
    'GEOREF',
    'GESIS',
    'Google Scholar',
    'Hein Online',
    'IBSS',
    'IBZ',
    'IEEE Xplore',
    'Index Copernicus',
    'INFOSCI',
    'INSPEC',
    'j-GATE',
    'JSTOR',
    'LEXIS NEXIS',
  ];

  static CommunicationType: string[] = [
    'Comunicare orală', 'Expoziție', 'Poster',
  ];

  static ManifestationType: string[] = [
    'Conferință', 'Congres', 'Simpozion', 'Seminar', 'Atelier de lucru',
    'Expoziție cu rezultate ale cercetării sau invenții',
    'Școala de vară', 'Masa rotundă', 'Ziua cercetătorului', 'Alte evenimente',
  ];

  static ManifestationClassification: string[] = [
    'Internațională', 'Națională cu participare internațională',
    'Națională', 'Regională', 'Locală',
  ];

  static ActivityType: string[] = [
    'Curs', 'Laborator', 'Curs și laborator',
  ];

  static HierarchyDomains = [
    'Automation & Control System',
    'Computer Science, Artificial Intelligence',
    'Computer Science, Information Systems',
    'Computer Science, Interdisciplinary Applications',
    'Computer Science, Software Engineering',
    'Computer Science, Theory & Methods',
    'Engineering, Industrial',
    'Environmental Sciences',
    'Health Care Sciences & Services',
    'Medical Informatics',
    'Robotics',
  ];

  static activityType = [
    'Curs',
    'Laborator',
    'Curs și laborator',
  ];
}

/* FORMS */
/** -----------============== Coordinator ==============----------- */
/** Activitatea științifică a conducatorului de doctorat */
export class CoordinatorScientificActivity {
  id?: number;
  ownerId?: number;

  fullName: string = '';
  publicationNumberWebOfScience: string = '';
  committees: string = '';
  conferences: string = '';
  reportYear: number = 2021;

  updatedAt?: Date;
  createdAt?: Date;
}

/** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSUD-UAIC */
export class CoordinatorReferentialActivity {
  id?: number;
  ownerId?: number;

  fullName: string = '';
  thesisDomain: string = '';
  thesisReference: string = '';
  IOSUD: string = '';

  updatedAt?: Date;
  createdAt?: Date;
}

/** -----------============== Student ==============----------- */
/** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
export class ScientificArticleISI {
  sheetName = 'Articole ştiintifice...ISI...';

  colName = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Data publicarii',
    'Volum', 'ISSUE', 'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Factor de impact',
    'Clasificare CNATDCU', 'DOI', 'Denumire conferința', 'Observatii', 'Ultima modificare', 'Data crearii', 'Data crearii'];

  articleTitle: string = '';
  authors: string = '';
  publicationDate: Date = new Date();
  volume: string = '';
  issue: string = '';
  startingPage: number = 0;
  endingPage: number = 1;
  impactFactor: string = '';
  cnatdcuClassification: string = '';
  doi: string = '';
  conferenceName: string = '';
  observations: string = '';

  id?: number;
  userId?: number;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** ISI proceedings */
export class ISIProceeding {
  sheetName = 'ISI proceedings';

  colName = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Denumire conferinta',
    'Tip volum indexat', 'Anul publicarii', 'Tipul lucrarii', 'Tip conferinta', 'Linkul conferintei',
    'Nr. pagina de start', 'Nr. pagina de sfarsit', 'Observatii', 'Ultima modificare', 'Data crearii'];

  articleTitle: string = '';
  authors: string = '';
  conferenceName: string = '';
  indexedVolumeType: string = '';
  publicationYear: number = 2022;
  articleType: string = '';
  conferenceType: string = '';
  conferenceLink: string = '';
  startingPage: number = 1;
  endingPage: number = 2;
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
export class ScientificArticleBDI {
  sheetName = 'Articole științifice...BDI..';

  colName = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul articolului', 'Autori',
    'Denumire revista indexata BDI', 'Anul publicarii', 'Volum', 'Numar',
    'Nr. pagina de start', 'Nr. pagina de sfarsit',
    'Revista internationala', 'Clasificare CNATDCU',
    'Link articol indexat', 'Baza de date BDI',
    'Linkul bazei de date BDI',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  hierarchyDomains: string = '';
  articleTitle: string = '';
  authors: string = '';
  bdiIndexedMagazine: string = '';
  publicationYear: number = 2022;
  volume: string = '';
  number: number = 1;
  startingPage: number = 1;
  endingPage: number = 2;
  internationalMagazine: string = '';
  cnatdcuClassification: string = '';
  indexedArticleLink: string = '';
  bdiDatabase: string = '';
  bdiDatabaseLink: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
export class ScientificBook {
  sheetName = 'Cărţi ştiinţifice...';

  colName = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul capitolului', 'Autori',
    'Titlul cartii', 'Numarul de pagini', 'Anul publicarii', 'Editura',
    'Tipul publicatiei', 'ISBN',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  hierarchyDomains: string = '';
  chapterTitle: string = '';
  authors: string = '';
  bookTitle: string = '';
  pageNumber: string = '';
  publicationYear: number = 2022;
  publishingHouse: string = '';
  publicationType: string = '';
  isbn: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Traduceri */
export class Translation {
  sheetName = 'Traduceri';

  colName = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul traducerii', 'Autori',
    'Autorii tradusi', 'Anul publicarii', 'Editura', 'Tara',
    'Numarul de pagini', 'ISBN',
    'Tipul traducerii',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  hierarchyDomains: string = '';
  translationTitle: string = '';
  authors: string = '';
  translatedAuthors: string = '';
  publicationYear: number = 2022;
  publishingHouse: string = '';
  country: string = '';
  pageNumber: number = 1;
  isbn: string = '';
  translationType: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Comunicări în manifestări științifice */
export class ScientificCommunication {
  sheetName = 'Comunicări...';

  colName = ['Numar Matricol', 'Autori', 'Tipul comunicarii', 'Anul prezentarii',
    'Denumirea manifestarii stiintifice', 'Tipul manifestarii', 'Link către site-ul manifestării',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  authors: string = '';
  communicationType: string = '';
  presentationYear: number = 2022;
  scientificManifestationName: string = '';
  manifestationType: string = '';
  scientificManifestationLink: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Brevete */
export class Patent {
  sheetName = 'Brevete';

  colName = ['Numar Matricol', 'Titlul brevetului / CBI', 'Autori',
    'Anul obținerii brevetului / depunerii CBI', 'Numar brevet', 'Tipul brevetului',
    'Autoritate eminenta', 'Tara',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  patentTitleOrCBI: string = '';
  authors: string = '';
  yearOfObtainingPatent: number = 2022;
  patentNumber: number = 1;
  patentType: string = '';
  authority: string = '';
  country: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Contracte de cercetare */
export class ResearchContract {
  sheetName = 'Contracte de cercetare';

  colName = ['Numar Matricol', 'Domenii de ierarhizare', 'Titlul articolului', 'Autori',
    'Denumire revista indexata BDI', 'Anul publicarii', 'Volum', 'Numar',
    'Nr. pagina de start', 'Nr. pagina de sfarsit',
    'Revista internationala', 'Clasificare CNATDCU',
    'Link articol indexat', 'Baza de date BDI',
    'Linkul bazei de date BDI',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  researchContractNameOrProject: string = '';
  projectCode: string = '';
  financier: string = '';
  function: string = '';
  startProjectPeriod: Date = new Date();
  endProjectPeriod: Date = new Date();
  contractType: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Citări */
export class Citation {
  sheetName = 'Citări';

  colName = ['Numar Matricol', 'Titlul articolului', 'Autori', 'Titlul publicației unde este citat articolul',
    'Numele autorilor care citeaza', 'Anul citarii', 'Volum', 'Factor de impact',
    'Issue', 'Numărul articolului',
    'Nr. pagina de start', 'Nr. pagina de sfarsit',
    'Link articol indexat', 'Baza de date BDI',
    'DOI', 'Clasificare CNATDCU', 'Citari',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  articleTitle: string = '';
  authors: string = '';
  publicationTitleWhereReferenced: string = '';
  authorsNamesThatReference: string = '';
  citationYear: number = 2022;
  volume: string = '';
  impactFactor: string = '';
  issue: string = '';
  articleNumber: number = 1;
  startingPage: number = 2;
  endingPage: number = 3;
  doi: string = '';
  cnatdcuClassification: string = '';
  citations: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Premii si nominalizări */
export class AwardAndNomination {
  sheetName = 'Premii si nominalizari';

  colName = ['Numar Matricol', 'Anul acordarii premiului', 'Denumirea premiului', 'Tipul premiului',
    'Organizația care a acordat premiul', 'Tara', 'Acordat pentru activitatea didactică / cercetare',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  yearOfAward: number = 2022;
  awardName: string = '';
  awardType: string = '';
  organizationThatGiveTheAward: string = '';
  country: string = '';
  awardedFor: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Membru în academii */
export class AcademyMember {
  sheetName = 'Membru în academii';

  colName = ['Numar Matricol', 'Anul admiterii', 'Denumirea academiei', 'Tip membru',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  admissionYear: number = 2022;
  academyName: string = '';
  memberType: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Membru în echipa editorială */
export class EditorialMember {
  sheetName = 'Membru în echipa editorială';

  colName = ['Numar Matricol', 'Denumire comitet', 'Denumire revista / editura', 'Anul intrarii în comitet',
    'Calitatea', 'Tipul revistei', 'National / International',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  committeeName: string = '';
  magazineName: string = '';
  yearOfCommitteeAttendance: number = 2022;
  quality: string = '';
  magazineType: string = '';
  nationalOrInternational: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Evenimente organizate */
export class OrganizedEvent {
  sheetName = 'Evenimente organizate';

  colName = ['Numar Matricol', 'Denumirea manifestarii', 'Data de inceput', 'Data de sfarsit',
    'Locul de desfasurare', 'Tipul manifestării', 'Clasificarea manifestării în funcție de participare', 'Link-ul manifestarii',
    'Persoana de contact',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  manifestationName: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  manifestationPlace: string = '';
  manifestationType: string = '';
  manifestationClassification: string = '';
  manifestationLink: string = '';
  contactPerson: string = '';
  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Fără activitate științifică */
export class WithoutActivity {
  sheetName = 'Fără activitate științifică';

  colName = ['Numar Matricol',
    'Observatii', 'Ultima modificare', 'Data crearii'];

  observations: string = '';

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}

/** Activitate didactică */
export class DidacticActivity {
  sheetName = 'Activitate didactică';

  colName = ['Numar Matricol', 'Denumire disciplina', 'Tipul activitatii', 'Anul sustinerii activitatii', 'Ultima modificare', 'Data crearii'];

  className: string = '';
  activityType: string = '';
  yearOfAttendingActivity: number = 2022;

  id?: number;
  owner?: string;
  updatedAt?: Date;
  createdAt?: Date;

  loading = false;
}
