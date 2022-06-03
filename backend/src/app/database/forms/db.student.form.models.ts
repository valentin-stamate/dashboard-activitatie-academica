import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {StudentModel} from "../db.models";

/** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
@Entity()
export class ScientificArticleISIModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    articleTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    publicationDate!: Date;
    @Column({nullable: false})
    volume!: string;
    @Column({nullable: false})
    issue!: string;
    @Column({nullable: false})
    startingPage!: number;
    @Column({nullable: false})
    endingPage!: number;
    @Column({nullable: false})
    impactFactor!: string;
    @Column({nullable: false})
    cnatdcuClassification!: string;
    @Column({nullable: false})
    doi!: string;
    @Column({nullable: false})
    conferenceName!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.scientificArticleISI)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ScientificArticleISIModel {
        const model = new ScientificArticleISIModel();

        model.articleTitle = object.articleTitle ?? '';
        model.authors = object.authors ?? '';
        model.publicationDate = object.publicationDate ?? '';
        model.volume = object.volume ?? '';
        model.issue = object.issue ?? '';
        model.startingPage = object.startingPage ?? '';
        model.endingPage = object.endingPage ?? '';
        model.impactFactor = object.impactFactor ?? '';
        model.cnatdcuClassification = object.cnatdcuClassification ?? '';
        model.doi = object.doi ?? '';
        model.conferenceName = object.conferenceName ?? '';
        model.observations = object.observations ?? '';

        return model
    }

    update(object: any) {
        this.articleTitle = object.articleTitle ?? this.articleTitle;
        this.authors = object.authors ?? this.authors;
        this.publicationDate = object.publicationDate ?? this.publicationDate;
        this.volume = object.volume ?? this.volume;
        this.issue = object.issue ?? this.issue;
        this.startingPage = object.startingPage ?? this.startingPage;
        this.endingPage = object.endingPage ?? this.endingPage;
        this.impactFactor = object.impactFactor ?? this.impactFactor;
        this.cnatdcuClassification = object.cnatdcuClassification ?? this.cnatdcuClassification;
        this.doi = object.doi ?? this.doi;
        this.conferenceName = object.conferenceName ?? this.conferenceName;
        this.observations = object.observations ?? this.observations;
    }
}

/** ISI proceedings */
@Entity()
export class ISIProceedingModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    articleTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    conferenceName!: string;
    @Column({nullable: false})
    indexedVolumeType!: string;
    @Column({nullable: false})
    publicationYear!: number;
    @Column({nullable: false})
    articleType!: string;
    @Column({nullable: false})
    conferenceType!: string;
    @Column({nullable: false})
    conferenceLink!: string;
    @Column({nullable: false})
    startingPage!: number;
    @Column({nullable: false})
    endingPage!: number;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.isiProceeding)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ISIProceedingModel {
        const model = new ISIProceedingModel();

        model.articleTitle = object.articleTitle ?? '';
        model.authors = object.authors ?? '';
        model.conferenceName = object.conferenceName ?? '';
        model.indexedVolumeType = object.indexedVolumeType ?? '';
        model.publicationYear = object.publicationYear ?? '';
        model.articleType = object.articleType ?? '';
        model.conferenceType = object.conferenceType ?? '';
        model.conferenceLink = object.conferenceLink ?? '';
        model.startingPage = object.startingPage ?? '';
        model.endingPage = object.endingPage ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.articleTitle = object.articleTitle ?? this.articleTitle;
        this.authors = object.authors ?? this.authors;
        this.conferenceName = object.conferenceName ?? this.conferenceName;
        this.indexedVolumeType = object.indexedVolumeType ?? this.indexedVolumeType;
        this.publicationYear = object.publicationYear ?? this.publicationYear;
        this.articleType = object.articleType ?? this.articleType;
        this.conferenceType = object.conferenceType ?? this.conferenceType;
        this.conferenceLink = object.conferenceLink ?? this.conferenceLink;
        this.startingPage = object.startingPage ?? this.startingPage;
        this.endingPage = object.endingPage ?? this.endingPage;
        this.observations = object.observations ?? this.observations;
    }
}

/** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
@Entity()
export class ScientificArticleBDIModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    hierarchyDomains!: string;
    @Column({nullable: false})
    articleTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    bdiIndexedMagazine!: string;
    @Column({nullable: false})
    publicationYear!: number;
    @Column({nullable: false})
    volume!: string;
    @Column({nullable: false})
    number!: number;
    @Column({nullable: false})
    startingPage!: number;
    @Column({nullable: false})
    endingPage!: number;
    @Column({nullable: false})
    internationalMagazine!: string;
    @Column({nullable: false})
    cnatdcuClassification!: string;
    @Column({nullable: false})
    indexedArticleLink!: string;
    @Column({nullable: false})
    bdiDatabase!: string;
    @Column({nullable: false})
    bdiDatabaseLink!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.scientificArticleBDI)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ScientificArticleBDIModel {
        const model = new ScientificArticleBDIModel();

        model.hierarchyDomains = object.hierarchyDomains ?? '';
        model.articleTitle = object.articleTitle ?? '';
        model.authors = object.authors ?? '';
        model.bdiIndexedMagazine = object.bdiIndexedMagazine ?? '';
        model.publicationYear = object.publicationYear ?? '';
        model.volume = object.volume ?? '';
        model.number = object.number ?? '';
        model.startingPage = object.startingPage ?? '';
        model.endingPage = object.endingPage ?? '';
        model.internationalMagazine = object.internationalMagazine ?? '';
        model.cnatdcuClassification = object.cnatdcuClassification ?? '';
        model.indexedArticleLink = object.indexedArticleLink ?? '';
        model.bdiDatabase = object.bdiDatabase ?? '';
        model.bdiDatabaseLink = object.bdiDatabaseLink ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.hierarchyDomains = object.hierarchyDomains ?? this.hierarchyDomains;
        this.articleTitle = object.articleTitle ?? this.articleTitle;
        this.authors = object.authors ?? this.authors;
        this.bdiIndexedMagazine = object.bdiIndexedMagazine ?? this.bdiIndexedMagazine;
        this.publicationYear = object.publicationYear ?? this.publicationYear;
        this.volume = object.volume ?? this.volume;
        this.number = object.number ?? this.number;
        this.startingPage = object.startingPage ?? this.startingPage;
        this.endingPage = object.endingPage ?? this.endingPage;
        this.internationalMagazine = object.internationalMagazine ?? this.internationalMagazine;
        this.cnatdcuClassification = object.cnatdcuClassification ?? this.cnatdcuClassification;
        this.indexedArticleLink = object.indexedArticleLink ?? this.indexedArticleLink;
        this.bdiDatabase = object.bdiDatabase ?? this.bdiDatabase;
        this.bdiDatabaseLink = object.bdiDatabaseLink ?? this.bdiDatabaseLink;
        this.observations = object.observations ?? this.observations;
    }
}

/** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
@Entity()
export class ScientificBookModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    hierarchyDomains!: string;
    @Column({nullable: false})
    chapterTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    bookTitle!: string;
    @Column({nullable: false})
    pageNumber!: string;
    @Column({nullable: false})
    publicationYear!: number;
    @Column({nullable: false})
    publishingHouse!: string;
    @Column({nullable: false})
    publicationType!: string;
    @Column({nullable: false})
    isbn!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.scientificBook)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ScientificBookModel {
        const model = new ScientificBookModel();

        model.hierarchyDomains = object.hierarchyDomains ?? '';
        model.chapterTitle = object.chapterTitle ?? '';
        model.authors = object.authors ?? '';
        model.bookTitle = object.bookTitle ?? '';
        model.pageNumber = object.pageNumber ?? '';
        model.publicationYear = object.publicationYear ?? '';
        model.publishingHouse = object.publishingHouse ?? '';
        model.publicationType = object.publicationType ?? '';
        model.isbn = object.isbn ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.hierarchyDomains = object.hierarchyDomains ?? this.hierarchyDomains;
        this.chapterTitle = object.chapterTitle ?? this.chapterTitle;
        this.authors = object.authors ?? this.authors;
        this.bookTitle = object.bookTitle ?? this.bookTitle;
        this.pageNumber = object.pageNumber ?? this.pageNumber;
        this.publicationYear = object.publicationYear ?? this.publicationYear;
        this.publishingHouse = object.publishingHouse ?? this.publishingHouse;
        this.publicationType = object.publicationType ?? this.publicationType;
        this.isbn = object.isbn ?? this.isbn;
        this.observations = object.observations ?? this.observations;
    }
}

/** Traduceri */
@Entity()
export class TranslationModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    hierarchyDomains!: string;
    @Column({nullable: false})
    translationTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    translatedAuthors!: string;
    @Column({nullable: false})
    publicationYear!: number;
    @Column({nullable: false})
    publishingHouse!: string;
    @Column({nullable: false})
    country!: string;
    @Column({nullable: false})
    pageNumber!: number;
    @Column({nullable: false})
    isbn!: string;
    @Column({nullable: false})
    translationType!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.translation)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): TranslationModel {
        const model = new TranslationModel();

        model.hierarchyDomains = object.hierarchyDomains ?? '';
        model.translationTitle = object.translationTitle ?? '';
        model.authors = object.authors ?? '';
        model.translatedAuthors = object.translatedAuthors ?? '';
        model.publicationYear = object.publicationYear ?? '';
        model.publishingHouse = object.publishingHouse ?? '';
        model.country = object.country ?? '';
        model.pageNumber = object.pageNumber ?? '';
        model.isbn = object.isbn ?? '';
        model.translationType = object.translationType ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.hierarchyDomains = object.hierarchyDomains ?? this.hierarchyDomains;
        this.translationTitle = object.translationTitle ?? this.translationTitle;
        this.authors = object.authors ?? this.authors;
        this.translatedAuthors = object.translatedAuthors ?? this.translatedAuthors;
        this.publicationYear = object.publicationYear ?? this.publicationYear;
        this.publishingHouse = object.publishingHouse ?? this.publishingHouse;
        this.country = object.country ?? this.country;
        this.pageNumber = object.pageNumber ?? this.pageNumber;
        this.isbn = object.isbn ?? this.isbn;
        this.translationType = object.translationType ?? this.translationType;
        this.observations = object.observations ?? this.observations;
    }
}

/** Comunicări în manifestări științifice */
@Entity()
export class ScientificCommunicationModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    communicationType!: string;
    @Column({nullable: false})
    presentationYear!: number;
    @Column({nullable: false})
    scientificManifestationName!: string;
    @Column({nullable: false})
    manifestationType!: string;
    @Column({nullable: false})
    scientificManifestationLink!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.scientificCommunication)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ScientificCommunicationModel {
        const model = new ScientificCommunicationModel();

        model.authors = object.authors ?? '';
        model.communicationType = object.communicationType ?? '';
        model.presentationYear = object.presentationYear ?? '';
        model.scientificManifestationName = object.scientificManifestationName ?? '';
        model.manifestationType = object.manifestationType ?? '';
        model.scientificManifestationLink = object.scientificManifestationLink ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.authors = object.authors ?? this.authors;
        this.communicationType = object.communicationType ?? this.communicationType;
        this.presentationYear = object.presentationYear ?? this.presentationYear;
        this.scientificManifestationName = object.scientificManifestationName ?? this.scientificManifestationName;
        this.manifestationType = object.manifestationType ?? this.manifestationType;
        this.scientificManifestationLink = object.scientificManifestationLink ?? this.scientificManifestationLink;
        this.observations = object.observations ?? this.observations;
    }
}

/** Brevete */
@Entity()
export class PatentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    patentTitleOrCBI!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    yearOfObtainingPatent!: number;
    @Column({nullable: false})
    patentNumber!: number;
    @Column({nullable: false})
    patentType!: string;
    @Column({nullable: false})
    authority!: string;
    @Column({nullable: false})
    country!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.patent)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): PatentModel {
        const model = new PatentModel();

        model.patentTitleOrCBI = object.patentTitleOrCBI ?? '';
        model.authors = object.authors ?? '';
        model.yearOfObtainingPatent = object.yearOfObtainingPatent ?? '';
        model.patentNumber = object.patentNumber ?? '';
        model.patentType = object.patentType ?? '';
        model.authority = object.authority ?? '';
        model.country = object.country ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.patentTitleOrCBI = object.patentTitleOrCBI ?? this.patentTitleOrCBI;
        this.authors = object.authors ?? this.authors;
        this.yearOfObtainingPatent = object.yearOfObtainingPatent ?? this.yearOfObtainingPatent;
        this.patentNumber = object.patentNumber ?? this.patentNumber;
        this.patentType = object.patentType ?? this.patentType;
        this.authority = object.authority ?? this.authority;
        this.country = object.country ?? this.country;
        this.observations = object.observations ?? this.observations;
    }
}

/** Contracte de cercetare */
@Entity()
export class ResearchContractModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    researchContractNameOrProject!: string;
    @Column({nullable: false})
    projectCode!: string;
    @Column({nullable: false})
    financier!: string;
    @Column({nullable: false})
    function!: string;
    @Column({nullable: false})
    startProjectPeriod!: Date;
    @Column({nullable: false})
    endProjectPeriod!: Date;
    @Column({nullable: false})
    contractType!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.researchContract)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): ResearchContractModel {
        const model = new ResearchContractModel();

        model.researchContractNameOrProject = object.researchContractNameOrProject ?? '';
        model.projectCode = object.projectCode ?? '';
        model.financier = object.financier ?? '';
        model.function = object.function ?? '';
        model.startProjectPeriod = object.startProjectPeriod ?? '';
        model.endProjectPeriod = object.endProjectPeriod ?? '';
        model.contractType = object.contractType ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.researchContractNameOrProject = object.researchContractNameOrProject ?? this.researchContractNameOrProject;
        this.projectCode = object.projectCode ?? this.projectCode;
        this.financier = object.financier ?? this.financier;
        this.function = object.function ?? this.function;
        this.startProjectPeriod = object.startProjectPeriod ?? this.startProjectPeriod;
        this.endProjectPeriod = object.endProjectPeriod ?? this.endProjectPeriod;
        this.contractType = object.contractType ?? this.contractType;
        this.observations = object.observations ?? this.observations;
    }
}

/** Citări */
@Entity()
export class CitationModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    articleTitle!: string;
    @Column({nullable: false})
    authors!: string;
    @Column({nullable: false})
    publicationTitleWhereReferenced!: string;
    @Column({nullable: false})
    authorsNamesThatReference!: string;
    @Column({nullable: false})
    citationYear!: number;
    @Column({nullable: false})
    volume!: string;
    @Column({nullable: false})
    impactFactor!: string;
    @Column({nullable: false})
    issue!: string;
    @Column({nullable: false})
    articleNumber!: number;
    @Column({nullable: false})
    startingPage!: number;
    @Column({nullable: false})
    endingPage!: number;
    @Column({nullable: false})
    doi!: string;
    @Column({nullable: false})
    cnatdcuClassification!: string;
    @Column({nullable: false})
    citations!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.citation)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): CitationModel {
        const model = new CitationModel();

        model.articleTitle = object.articleTitle ?? '';
        model.authors = object.authors ?? '';
        model.publicationTitleWhereReferenced = object.publicationTitleWhereReferenced ?? '';
        model.authorsNamesThatReference = object.authorsNamesThatReference ?? '';
        model.citationYear = object.citationYear ?? '';
        model.volume = object.volume ?? '';
        model.impactFactor = object.impactFactor ?? '';
        model.issue = object.issue ?? '';
        model.articleNumber = object.articleNumber ?? '';
        model.startingPage = object.startingPage ?? '';
        model.endingPage = object.endingPage ?? '';
        model.doi = object.doi ?? '';
        model.cnatdcuClassification = object.cnatdcuClassification ?? '';
        model.citations = object.citations ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.articleTitle = object.articleTitle ?? this.articleTitle;
        this.authors = object.authors ?? this.authors;
        this.publicationTitleWhereReferenced = object.publicationTitleWhereReferenced ?? this.publicationTitleWhereReferenced;
        this.authorsNamesThatReference = object.authorsNamesThatReference ?? this.authorsNamesThatReference;
        this.citationYear = object.citationYear ?? this.citationYear;
        this.volume = object.volume ?? this.volume;
        this.impactFactor = object.impactFactor ?? this.impactFactor;
        this.issue = object.issue ?? this.issue;
        this.articleNumber = object.articleNumber ?? this.articleNumber;
        this.startingPage = object.startingPage ?? this.startingPage;
        this.endingPage = object.endingPage ?? this.endingPage;
        this.doi = object.doi ?? this.doi;
        this.cnatdcuClassification = object.cnatdcuClassification ?? this.cnatdcuClassification;
        this.citations = object.citations ?? this.citations;
        this.observations = object.observations ?? this.observations;
    }
}

/** Premii si nominalizări */
@Entity()
export class AwardAndNominationModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    yearOfAward!: number;
    @Column({nullable: false})
    awardName!: string;
    @Column({nullable: false})
    awardType!: string;
    @Column({nullable: false})
    organizationThatGiveTheAward!: string;
    @Column({nullable: false})
    country!: string;
    @Column({nullable: false})
    awardedFor!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.awardAndNomination)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): AwardAndNominationModel {
        const model = new AwardAndNominationModel();

        model.yearOfAward = object.yearOfAward ?? '';
        model.awardName = object.awardName ?? '';
        model.awardType = object.awardType ?? '';
        model.organizationThatGiveTheAward = object.organizationThatGiveTheAward ?? '';
        model.country = object.country ?? '';
        model.awardedFor = object.awardedFor ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.yearOfAward = object.yearOfAward;
        this.awardName = object.awardName;
        this.awardType = object.awardType;
        this.organizationThatGiveTheAward = object.organizationThatGiveTheAward;
        this.country = object.country;
        this.awardedFor = object.awardedFor;
        this.observations = object.observations;
    }
}

/** Membru în academii */
@Entity()
export class AcademyMemberModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    admissionYear!: number;
    @Column({nullable: false})
    academyName!: string;
    @Column({nullable: false})
    memberType!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.academyMember)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): AcademyMemberModel {
        const model = new AcademyMemberModel();

        model.admissionYear = object.admissionYear ?? '';
        model.academyName = object.academyName ?? '';
        model.memberType = object.memberType ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.admissionYear = object.admissionYear;
        this.academyName = object.academyName;
        this.memberType = object.memberType;
        this.observations = object.observations;
    }
}

/** Membru în echipa editorială */
@Entity()
export class EditorialMemberModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    committeeName!: string;
    @Column({nullable: false})
    magazineName!: string;
    @Column({nullable: false})
    yearOfCommitteeAttendance!: number;
    @Column({nullable: false})
    quality!: string;
    @Column({nullable: false})
    magazineType!: string;
    @Column({nullable: false})
    nationalOrInternational!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.editorialMember)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): EditorialMemberModel {
        const model = new EditorialMemberModel();

        model.committeeName = object.committeeName ?? '';
        model.magazineName = object.magazineName ?? '';
        model.yearOfCommitteeAttendance = object.yearOfCommitteeAttendance ?? '';
        model.quality = object.quality ?? '';
        model.magazineType = object.magazineType ?? '';
        model.nationalOrInternational = object.nationalOrInternational ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.committeeName = object.committeeName ?? this.committeeName;
        this.magazineName = object.magazineName ?? this.magazineName;
        this.yearOfCommitteeAttendance = object.yearOfCommitteeAttendance ?? this.yearOfCommitteeAttendance;
        this.quality = object.quality ?? this.quality;
        this.magazineType = object.magazineType ?? this.magazineType;
        this.nationalOrInternational = object.nationalOrInternational ?? this.nationalOrInternational;
        this.observations = object.observations ?? this.observations;
    }
}

/** Evenimente organizate */
@Entity()
export class OrganizedEventModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    manifestationName!: string;
    @Column({nullable: false})
    startDate!: Date;
    @Column({nullable: false})
    endDate!: Date;
    @Column({nullable: false})
    manifestationPlace!: string;
    @Column({nullable: false})
    manifestationType!: string;
    @Column({nullable: false})
    manifestationClassification!: string;
    @Column({nullable: false})
    manifestationLink!: string;
    @Column({nullable: false})
    contactPerson!: string;
    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.organizedEvent)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): OrganizedEventModel {
        const model = new OrganizedEventModel();

        model.manifestationName = object.manifestationName ?? '';
        model.startDate = object.startDate ?? '';
        model.endDate = object.endDate ?? '';
        model.manifestationPlace = object.manifestationPlace ?? '';
        model.manifestationType = object.manifestationType ?? '';
        model.manifestationClassification = object.manifestationClassification ?? '';
        model.manifestationLink = object.manifestationLink ?? '';
        model.contactPerson = object.contactPerson ?? '';
        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.manifestationName = object.manifestationName ?? this.manifestationName;
        this.startDate = object.startDate ?? this.startDate;
        this.endDate = object.endDate ?? this.endDate;
        this.manifestationPlace = object.manifestationPlace ?? this.manifestationPlace;
        this.manifestationType = object.manifestationType ?? this.manifestationType;
        this.manifestationClassification = object.manifestationClassification ?? this.manifestationClassification;
        this.manifestationLink = object.manifestationLink ?? this.manifestationLink;
        this.contactPerson = object.contactPerson ?? this.contactPerson;
        this.observations = object.observations ?? this.observations;
    }
}

/** Fără activitate științifică */
@Entity()
export class WithoutActivityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    observations!: string;

    @ManyToOne(() => StudentModel, relation => relation.withoutActivity)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): WithoutActivityModel {
        const model = new WithoutActivityModel();

        model.observations = object.observations ?? '';

        return model;
    }

    update(object: any) {
        this.observations = object.observations ?? this.observations;
    }
}

/** Activitate didactică */
@Entity()
export class DidacticActivityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    className!: string;
    @Column({nullable: false})
    activityType!: string;
    @Column({nullable: false})
    yearOfAttendingActivity!: number;

    @ManyToOne(() => StudentModel, relation => relation.didacticActivity)
    student!: StudentModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): DidacticActivityModel {
        const model = new DidacticActivityModel();

        model.className = object.className ?? '';
        model.activityType = object.activityType ?? '';
        model.yearOfAttendingActivity = object.yearOfAttendingActivity ?? '';

        return model;
    }

    update(object: any) {
        this.className = object.className ?? this.className;
        this.activityType = object.activityType ?? this.activityType;
        this.yearOfAttendingActivity = object.yearOfAttendingActivity ?? this.yearOfAttendingActivity;
    }
}