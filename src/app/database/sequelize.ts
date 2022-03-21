import {DataTypes, Model, Sequelize} from '@sequelize/core';

require('dotenv').config();
const env = process.env as any;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false,
});

const options = {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
};

export class BaseInformationModel extends Model {}
export class UserModel extends Model {}
export class UserKeyModel extends Model {}
export class ProfessorModel extends Model {}

export class ScientificArticleISIModel extends Model {}
export class ISIProceedingModel extends Model {}
export class ScientificArticleBDIModel extends Model {}
export class ScientificBookModel extends Model {}
export class TranslationModel extends Model {}
export class ScientificCommunicationModel extends Model {}
export class PatentModel extends Model {}
export class ResearchContractModel extends Model {}
export class CitationModel extends Model {}
export class AwardAndNominationModel extends Model {}
export class AcademyMemberModel extends Model {}
export class EditorialMemberModel extends Model {}
export class OrganizedEventModel extends Model {}
export class WithoutActivityModel extends Model {}
export class DidacticActivityModel extends Model {}

/************************************************************************************
 *                               Table Initialization
 ***********************************************************************************/

BaseInformationModel.init( {
    fullName:    {type: DataTypes.STRING, allowNull: false,},
    identifier:  {type: DataTypes.STRING, allowNull: false, unique: true,},
    coordinator: {type: DataTypes.STRING, allowNull: false,},
    attendanceYear:    {type: DataTypes.INTEGER, allowNull: false,},
}, {...options, modelName: 'base_information'});

UserModel.init({
        identifier:       {type: DataTypes.STRING, unique: true, allowNull: false,},
        email:            {type: DataTypes.STRING, unique: true, allowNull: false,},
        alternativeEmail: {type: DataTypes.STRING, unique: true, allowNull: false,},
        admin:            {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,},
    },
    {...options, tableName: 'users',}
);

UserKeyModel.init({
    identifier: {type: DataTypes.STRING, unique: true, allowNull: false,},
    key:        {type: DataTypes.STRING, unique: true, allowNull: false,},
}, {...options, modelName: 'user_key'});

/************************************************************************************
 *                                    Forms
 ***********************************************************************************/

/** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
ScientificArticleISIModel.init({
        articleTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        publicationDate: {type: DataTypes.DATE,},
        volume: {type: DataTypes.STRING,},
        issue: {type: DataTypes.STRING,},
        startingPage: {type: DataTypes.INTEGER,},
        endingPage: {type: DataTypes.INTEGER,},
        impactFactor: {type: DataTypes.STRING,},
        cnatdcuClassification: {type: DataTypes.STRING,},
        doi: {type: DataTypes.STRING,},
        conferenceName: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'sc_article_isi',}
);
UserModel.hasMany(ScientificArticleISIModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** ISI proceedings */
ISIProceedingModel.init({
        articleTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        conferenceName: {type: DataTypes.STRING,},
        indexedVolumeType: {type: DataTypes.STRING,},
        publicationYear: {type: DataTypes.INTEGER,},
        articleType: {type: DataTypes.STRING,},
        conferenceType: {type: DataTypes.STRING,},
        conferenceLink: {type: DataTypes.STRING,},
        startingPage: {type: DataTypes.INTEGER,},
        endingPage: {type: DataTypes.INTEGER,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'isi_proceeding',}
);
UserModel.hasMany(ISIProceedingModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
ScientificArticleBDIModel.init({
        hierarchyDomains: {type: DataTypes.STRING,},
        articleTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        bdiIndexedMagazine: {type: DataTypes.STRING,},
        publicationYear: {type: DataTypes.INTEGER,},
        volume: {type: DataTypes.STRING,},
        number: {type: DataTypes.INTEGER,},
        startingPage: {type: DataTypes.INTEGER,},
        endingPage: {type: DataTypes.INTEGER,},
        internationalMagazine: {type: DataTypes.STRING,},
        cnatdcuClassification: {type: DataTypes.STRING,},
        indexedArticleLink: {type: DataTypes.STRING,},
        bdiDatabase: {type: DataTypes.STRING,},
        bdiDatabaseLink: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'sc_article_bdi',}
);
UserModel.hasMany(ScientificArticleBDIModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Cărți ştiinţifice sau capitole de cărți publicate în edituri */
ScientificBookModel.init({
        hierarchyDomains: {type: DataTypes.STRING,},
        chapterTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        bookTitle: {type: DataTypes.STRING,},
        pageNumber: {type: DataTypes.STRING,},
        publicationYear: {type: DataTypes.INTEGER,},
        publishingHouse: {type: DataTypes.STRING,},
        publicationType: {type: DataTypes.STRING,},
        isbn: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'sc_book',}
);
UserModel.hasMany(ScientificBookModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Traduceri */
TranslationModel.init({
        hierarchyDomains: {type: DataTypes.STRING,},
        translationTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        translatedAuthors: {type: DataTypes.STRING,},
        publicationYear: {type: DataTypes.INTEGER,},
        publishingHouse: {type: DataTypes.STRING,},
        country: {type: DataTypes.STRING,},
        pageNumber: {type: DataTypes.INTEGER,},
        isbn: {type: DataTypes.STRING,},
        translationType: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'translations',}
);
UserModel.hasMany(TranslationModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Comunicări în manifestări științifice */
ScientificCommunicationModel.init({
        authors: {type: DataTypes.STRING,},
        communicationType: {type: DataTypes.STRING,},
        presentationYear: {type: DataTypes.INTEGER,},
        scientificManifestationName: {type: DataTypes.STRING,},
        manifestationType: {type: DataTypes.STRING,},
        scientificManifestationLink: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'sc_communications',}
);
UserModel.hasMany(ScientificCommunicationModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Brevete */
PatentModel.init({
        patentTitleOrCBI: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        yearOfObtainingPatent: {type: DataTypes.INTEGER,},
        patentNumber: {type: DataTypes.INTEGER,},
        patentType: {type: DataTypes.STRING,},
        authority: {type: DataTypes.STRING,},
        country: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'patents',}
);
UserModel.hasMany(PatentModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Contracte de cercetare */
ResearchContractModel.init({
        researchContractNameOrProject: {type: DataTypes.STRING,},
        projectCode: {type: DataTypes.STRING,},
        financier: {type: DataTypes.STRING,},
        function: {type: DataTypes.STRING,},
        startProjectPeriod: {type: DataTypes.DATE,},
        endProjectPeriod: {type: DataTypes.DATE,},
        contractType: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'research_contract',}
);
UserModel.hasMany(ResearchContractModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Citări */
CitationModel.init({
        articleTitle: {type: DataTypes.STRING,},
        authors: {type: DataTypes.STRING,},
        publicationTitleWhereReferenced: {type: DataTypes.STRING,},
        authorsNamesThatReference: {type: DataTypes.STRING,},
        citationYear: {type: DataTypes.INTEGER,},
        volume: {type: DataTypes.STRING,},
        impactFactor: {type: DataTypes.STRING,},
        issue: {type: DataTypes.STRING,},
        articleNumber: {type: DataTypes.INTEGER,},
        startingPage: {type: DataTypes.INTEGER,},
        endingPage: {type: DataTypes.INTEGER,},
        doi: {type: DataTypes.STRING,},
        cnatdcuClassification: {type: DataTypes.STRING,},
        citations: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'citation',}
);
UserModel.hasMany(CitationModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Premii si nominalizări */
AwardAndNominationModel.init({
        yearOfAward: {type: DataTypes.INTEGER,},
        awardName: {type: DataTypes.STRING,},
        awardType: {type: DataTypes.STRING,},
        organizationThatGiveTheAward: {type: DataTypes.STRING,},
        country: {type: DataTypes.STRING,},
        awardedFor: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'awards_nominations',}
);
UserModel.hasMany(AwardAndNominationModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Membru în academii */
AcademyMemberModel.init({
        admissionYear: {type: DataTypes.INTEGER,},
        academyName: {type: DataTypes.STRING,},
        memberType: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'academy_member',}
);
UserModel.hasMany(AcademyMemberModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Membru în echipa editorială */
EditorialMemberModel.init({
        committeeName: {type: DataTypes.STRING,},
        magazineName: {type: DataTypes.STRING,},
        yearOfCommitteeAttendance: {type: DataTypes.INTEGER,},
        quality: {type: DataTypes.STRING,},
        magazineType: {type: DataTypes.STRING,},
        nationalOrInternational: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'editorial_member',}
);
UserModel.hasMany(EditorialMemberModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Evenimente organizate */
OrganizedEventModel.init({
        manifestationName: {type: DataTypes.STRING,},
        startDate: {type: DataTypes.DATE,},
        endDate: {type: DataTypes.DATE,},
        manifestationPlace: {type: DataTypes.STRING,},
        manifestationType: {type: DataTypes.STRING,},
        manifestationClassification: {type: DataTypes.STRING,},
        manifestationLink: {type: DataTypes.STRING,},
        contactPerson: {type: DataTypes.STRING,},
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'oraganized_events',}
);
UserModel.hasMany(OrganizedEventModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Fără activitate științifică */
WithoutActivityModel.init({
        observations: {type: DataTypes.STRING,},
    },
    {...options, tableName: 'without_activity',}
);
UserModel.hasMany(WithoutActivityModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

/** Activitate didactică */
DidacticActivityModel.init({
        className: {type: DataTypes.STRING,},
        activityType: {type: DataTypes.STRING,},
        yearOfAttendingActivity: {type: DataTypes.INTEGER,},
    },
    {...options, tableName: 'didactic_activity',}
);
UserModel.hasMany(DidacticActivityModel, {
    sourceKey: 'identifier',
    foreignKey: {name: 'owner', allowNull: false,},
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

async function initializeTables() {
    await sequelize.sync({ force: true });
}


/************************************************************************************
 *                                 Init Function
 ***********************************************************************************/
export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await initializeTables();

    await BaseInformationModel.create({
        fullName: 'Marin Aioanei',
        identifier: 'marin',
        coordinator: 'Buraga Cosmin',
        attendanceYear: 2021,
    });
    await BaseInformationModel.create({
        fullName: 'Andrei Amariei',
        identifier: 'andrei',
        founding: 'Taxa',
        coordinator: 'Aries Marin',
        attendanceYear: 2021,
    });

    await UserModel.create({
        identifier: 'valentin',
        email: 'stamatevalentin125@gmail.com',
        alternativeEmail: 'valentin.stamate@info.uaic.ro',
        admin: true,
    });
    await UserModel.create({
        identifier: 'marin',
        email: 'marin@gmail.com',
        alternativeEmail: 'avramescu.marin@info.uaic.ro',
    });

    await ScientificArticleISIModel.create({
        observations: 'Ana are mere',
        owner: 'valentin',
    });
}