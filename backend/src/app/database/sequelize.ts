import {DataTypes, Model, Sequelize} from '@sequelize/core';
import {CryptoUtil} from "../services/crypto.util";
import sha256 from "crypto-js/sha256";

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

export class AllowedStudentsModel extends Model {}
export class StudentModel extends Model {}
export class CoordinatorModel extends Model {}
export class AdminModel extends Model {}

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
export class AuthorizationKeyModel extends Model {}

export class CoordinatorScientificActivityModel extends Model {}
export class CoordinatorReferentialActivityModel extends Model {}

async function initializeTables(force: boolean) {
    /************************************************************************************
     *                               Table Initialization
     ***********************************************************************************/

    AuthorizationKeyModel.init({
        key: {type: DataTypes.STRING, allowNull: false,},
    }, {...options, modelName: 'authorization_keys'});

    AllowedStudentsModel.init( {
        fullName:    {type: DataTypes.STRING, allowNull: false,},
        identifier:  {type: DataTypes.STRING, allowNull: false, unique: true,},
        coordinator: {type: DataTypes.STRING, allowNull: false,},
        attendanceYear:    {type: DataTypes.INTEGER, allowNull: false,},
    }, {...options, modelName: 'allowed_students'});

    StudentModel.init({
            identifier:          {type: DataTypes.STRING, unique: true, allowNull: false,},
            fullName:            {type: DataTypes.STRING, unique: false, allowNull: false,},
            email:               {type: DataTypes.STRING, unique: true, allowNull: false,},
            alternativeEmail:    {type: DataTypes.STRING, unique: true, allowNull: false,},
            attendanceYear:      {type: DataTypes.INTEGER, unique: false, allowNull: false,},
            coordinatorName:     {type: DataTypes.STRING, unique: false, allowNull: false,},
            coordinatorFunction: {type: DataTypes.STRING, unique: false, allowNull: false,},
            isActive:            {type: DataTypes.BOOLEAN, unique: false, allowNull: false,},
        },
        {...options, tableName: 'students',}
    );

    CoordinatorModel.init({
        name:     {type: DataTypes.STRING, unique: true, allowNull: false,},
        function: {type: DataTypes.STRING, unique: false, allowNull: false,},
        email:    {type: DataTypes.STRING, unique: true, allowNull: false,},
        password: {type: DataTypes.STRING, unique: false, allowNull: false,},
    }, {...options, tableName: 'coordinators'});

    AdminModel.init({
        username: {type: DataTypes.STRING, unique: true, allowNull: false,},
        email:    {type: DataTypes.STRING, unique: true, allowNull: false,},
    }, {...options, tableName: 'admins'});

    await sequelize.sync({force: force});

    /************************************************************************************
     *                                    Forms
     ***********************************************************************************/

    /** -----------============== Coordinator ==============----------- */
    CoordinatorScientificActivityModel.init({
        fullName: {type: DataTypes.STRING,},
        publicationNumberWebOfScience: {type: DataTypes.STRING,},
        committees: {type: DataTypes.STRING,},
        conferences: {type: DataTypes.STRING,},
        reportYear: {type: DataTypes.INTEGER,},
    }, {...options});
    CoordinatorModel.hasMany(CoordinatorScientificActivityModel, {
        sourceKey: 'id',
        foreignKey: {name: 'ownerId', allowNull: false,},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    CoordinatorReferentialActivityModel.init({
        fullName: {type: DataTypes.STRING,},
        thesisDomain: {type: DataTypes.STRING,},
        thesisReference: {type: DataTypes.STRING,},
        IOSUD: {type: DataTypes.STRING,},
        reportYear: {type: DataTypes.INTEGER,},
    }, {...options});
    CoordinatorModel.hasMany(CoordinatorReferentialActivityModel, {
        sourceKey: 'id',
        foreignKey: {name: 'ownerId', allowNull: false,},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    /** -----------============== Student ==============----------- */
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
    StudentModel.hasMany(ScientificArticleISIModel, {
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
    StudentModel.hasMany(ISIProceedingModel, {
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
    StudentModel.hasMany(ScientificArticleBDIModel, {
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
    StudentModel.hasMany(ScientificBookModel, {
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
    StudentModel.hasMany(TranslationModel, {
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
    StudentModel.hasMany(ScientificCommunicationModel, {
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
    StudentModel.hasMany(PatentModel, {
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
    StudentModel.hasMany(ResearchContractModel, {
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
    StudentModel.hasMany(CitationModel, {
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
    StudentModel.hasMany(AwardAndNominationModel, {
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
    StudentModel.hasMany(AcademyMemberModel, {
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
    StudentModel.hasMany(EditorialMemberModel, {
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
    StudentModel.hasMany(OrganizedEventModel, {
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
    StudentModel.hasMany(WithoutActivityModel, {
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
    StudentModel.hasMany(DidacticActivityModel, {
        sourceKey: 'identifier',
        foreignKey: {name: 'owner', allowNull: false,},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    await sequelize.sync({force: force})
}


/************************************************************************************
 *                                 Init Function
 ***********************************************************************************/
export async function sequelizeInit(force: boolean) {
    console.log(`Sequelize init: force ${force}`);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return;
    }

    await initializeTables(force);

    if (!force) {
        return;
    }

    await AllowedStudentsModel.create({
        fullName: 'Stamate Valentin',
        identifier: 'valentin',
        coordinator: 'Prof. univ. dr. Lenuța Alboaie',
        attendanceYear: 2022,
    });

    await AllowedStudentsModel.create({
        fullName: 'Andrei Amariei',
        identifier: 'andrei',
        founding: 'Taxa',
        coordinator: 'Aries Marin',
        attendanceYear: 2021,
    });

    await AdminModel.create({
        username: 'valentin',
        email: 'stamatevalentin125@gmail.com',
    });

    await StudentModel.create({
        identifier: 'valentin',
        fullName: 'Valentin Aioanei',
        email: 'stamatevalentin125@gmail.com',
        alternativeEmail: 'valentin.stamate@info.uaic.ro',
        attendanceYear: 2019,
        coordinatorName: 'Buraza Ion',
        coordinatorFunction: 'Prof. univ. dr',
        isActive: true,
    });

    await CoordinatorModel.create({
        name: 'Buraza Ion',
        function: 'Prof. univ. dr',
        email: 'stamatevalentin125@gmail.com',
        password: sha256(CryptoUtil.scufflePassword('admin')).toString(),
    });

}