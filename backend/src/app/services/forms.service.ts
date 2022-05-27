import {
    AcademyMember,
    AwardAndNomination,
    Citation, CoordinatorReferentialActivity, CoordinatorScientificActivity,
    DidacticActivity,
    EditorialMember,
    ISIProceeding,
    OrganizedEvent,
    Patent,
    ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook,
    ScientificCommunication,
    Translation,
    WithoutActivity
} from "../database/form.models";
import XLSX, {WorkSheet} from "xlsx";

/* The final form method :D */
export class FormsService {

    static getCoordinatorScientificActivitySheet(rows: CoordinatorScientificActivity[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Nume şi prenume': item.fullName,
                'Număr publicaţii indexate Web of Science/ERIH/altele cu factor de impact': item.publicationNumberWebOfScience,
                'Comisii/comitete/asociații științifice internaționale în care are calitatea de membru': item.committees,
                'Conferințe/comisii la care a participat ca invitat/expert': item.conferences,
                'Anul raportării': item.reportYear,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            };
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getCoordinatorReferenceActivitySheet(rows: CoordinatorReferentialActivity[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Nume, prenume referent de la IOSUD UAIC': item.fullName,
                'Domeniul de doctorat': item.thesisDomain,
                'Teza la care a fost referent': item.thesisReference,
                'IOSUD organizatoare a tezei evaluate': item.IOSUD,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            };
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getScientificArticleISISheet(rows: ScientificArticleISI[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Titlul articolului': item.articleTitle,
                'Autori': item.authors,
                'Data publicării': item.publicationDate,
                'Volum': item.volume,
                'ISSUE': item.issue,
                'Nr. pagină de start': item.startingPage,
                'Nr. pagină de sfârșit': item.endingPage,
                'Factor de impact': item.impactFactor,
                'Clasificare CNATDCU': item.cnatdcuClassification,
                'DOI': item.doi,
                'Denumire conferință': item.conferenceName,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            };
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getISIProceedingsSheet(rows: ISIProceeding[]): WorkSheet {
        const parseRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Autor': item.authors,
                'Denumire conferință': item.conferenceName,
                'Tip volum indexat': item.indexedVolumeType,
                'Anul publicării': item.publicationYear,
                'Tipul lucrării (articol, rezumat, …)': item.articleType,
                'Tip Conferință': item.conferenceType,
                'Linkul conferinței': item.conferenceLink,
                'Nr. pagina de start': item.startingPage,
                'Nr. pagina de sfârșit': item.endingPage,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            };
        });

        return XLSX.utils.json_to_sheet(parseRows);
    }

    static getScientificArticleBDISheet(rows: ScientificArticleBDI[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Domenii de ierarhizare': item.hierarchyDomains,
                'Titlul articolului': item.articleTitle,
                'Autori': item.authors,
                'Denumire revistă indexată BDI': item.bdiIndexedMagazine,
                'Anul publicării': item.publicationYear,
                'Volum': item.volume,
                'Număr': item.number,
                'Nr. pagină de start': item.startingPage,
                'Nr. pagină de sfarșit': item.endingPage,
                'Revistă internațională': item.internationalMagazine,
                'Clasificare CNATDCU': item.cnatdcuClassification,
                'Link articol indexat': item.indexedArticleLink,
                'Baza de date BDI': item.bdiDatabase,
                'Linkul bazei de date BDI': item.bdiDatabaseLink,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getScientificBookSheet(rows: ScientificBook[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Domenii de ierarhizare': item.hierarchyDomains,
                'Titlul capitolului': item.chapterTitle,
                'Autori': item.authors,
                'Titlul cărtii': item.bookTitle,
                'Numărul de pagini': item.pageNumber,
                'Anul publicării': item.publicationYear,
                'Editura': item.publishingHouse,
                'Tipul publicației': item.publicationType,
                'ISBN': item.isbn,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getTranslationSheet(rows: Translation[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Domenii de ierarhizare': item.hierarchyDomains,
                'Titlul traducerii': item.translationTitle,
                'Autori': item.authors,
                'Autorii traduși': item.translatedAuthors,
                'Anul publicării': item.publicationYear,
                'Editura': item.publishingHouse,
                'Țara': item.country,
                'Numărul de pagini': item.pageNumber,
                'ISBN': item.isbn,
                'Tipul traducerii': item.translationType,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getScientificCommunicationSheet(rows: ScientificCommunication[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Autori': item.authors,
                'Tipul comunicării': item.communicationType,
                'Anul prezentării': item.presentationYear,
                'Denumirea manifestării știintifice': item.scientificManifestationName,
                'Tipul manifestării': item.manifestationType,
                'Link către site-ul manifestării': item.scientificManifestationLink,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getPatentSheet(rows: Patent[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Titlul brevetului / CBI': item.patentType,
                'Autori': item.authors,
                'Anul obținerii brevetului / depunerii CBI': item.yearOfObtainingPatent,
                'Număr brevet': item.patentType,
                'Tipul brevetului': item.patentType,
                'Autoritate eminentă': item.authority,
                'Țara': item.country,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getResearchContractSheet(rows: ResearchContract[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Denumire contract de cercetare / proiect': item.researchContractNameOrProject,
                'Cod proiect': item.projectCode,
                'Finanțator': item.financier,
                'Funcție': item.function,
                'Perioada de start a proiectului': item.startProjectPeriod,
                'Perioada de sfarșit a proiectului': item.endProjectPeriod,
                'Tipul contractului': item.contractType,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getCitationSheet(rows: Citation[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Titlul articolului': item.articleTitle,
                'Autori': item.authors,
                'Titlul publicației unde este citat articolul': item.publicationTitleWhereReferenced,
                'Numele autorilor care citează': item.authorsNamesThatReference,
                'Anul citării': item.citationYear,
                'Volum': item.volume,
                'Factor de impact': item.impactFactor,
                'Issue': item.issue,
                'Numărul articolului': item.articleNumber,
                'Nr. pagină de start': item.startingPage,
                'Nr. pagină de sfarșit': item.endingPage,
                'DOI': item.doi,
                'Clasificare CNATDCU': item.cnatdcuClassification,
                'Citări': item.citations,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getAwardAndNominationSheet(rows: AwardAndNomination[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Anul acordării premiului': item.yearOfAward,
                'Denumirea premiului': item.awardName,
                'Tipul premiului': item.awardType,
                'Organizația care a acordat premiul': item.organizationThatGiveTheAward,
                'Țara': item.country,
                'Acordat pentru activitatea didactică / cercetare': item.awardedFor,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getAcademyMemberSheet(rows: AcademyMember[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Anul admiterii': item.admissionYear,
                'Denumirea academiei': item.academyName,
                'Tip membru': item.memberType,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getEditorialMemberSheet(rows: EditorialMember[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Denumire comitet': item.committeeName,
                'Denumire revista / editura': item.magazineName,
                'Anul intrarii în comitet': item.yearOfCommitteeAttendance,
                'Calitatea': item.quality,
                'Tipul revistei': item.magazineType,
                'Național / Internațional': item.nationalOrInternational,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getOrganizedEventSheet(rows: OrganizedEvent[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Denumirea manifestării': item.manifestationName,
                'Data de început': item.startDate,
                'Data de sfârșit': item.endDate,
                'Locul de desfașurare': item.manifestationPlace,
                'Tipul manifestării': item.manifestationType,
                'Clasificarea manifestării în funcție de participare': item.manifestationClassification,
                'Link-ul manifestării': item.manifestationLink,
                'Persoana de contact': item.contactPerson,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getWithoutActivitySheet(rows: WithoutActivity[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Observații': item.observations,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

    static getDidacticActivitySheet(rows: DidacticActivity[]): WorkSheet {
        const parsedRows = rows.map((item) => {
            return {
                'Număr matricol': item.owner,
                'Denumire disciplină': item.className,
                'Tipul activitații': item.activityType,
                'Anul susținerii activității': item.yearOfAttendingActivity,
                'Ultima modificare': item.updatedAt,
                'Data creării': item.createdAt,
            }
        });

        return XLSX.utils.json_to_sheet(parsedRows);
    }

}