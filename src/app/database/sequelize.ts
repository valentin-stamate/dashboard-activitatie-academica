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
export class ScientificArticleISIModel extends Model {}

async function initializeTables() {
    /************************************************************************************
     *                               Table Initialization
     ***********************************************************************************/

    BaseInformationModel.init( {
        fullName:    {type: DataTypes.STRING, allowNull: false,},
        identifier:  {type: DataTypes.STRING, allowNull: false, unique: true,},
        founding:    {type: DataTypes.STRING, allowNull: false,},
        coordinator: {type: DataTypes.STRING, allowNull: false,},
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
        sourceKey: 'id',
        foreignKey: {name: 'userId', allowNull: false,},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

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

    const infoA = await BaseInformationModel.create({
        fullName: 'Stamate Valentin',
        identifier: 'valentin',
        founding: 'Bursa',
        coordinator: 'Lenuta Alboaie',
    });
    const infoB = await BaseInformationModel.create({
        fullName: 'Andrei Amariei',
        identifier: 'andrei',
        founding: 'Taxa',
        coordinator: 'Aries Marin',
    });

    const userA = await UserModel.create({
        identifier: 'valentin',
        email: 'stamatevalentin125@gmail.com',
        alternativeEmail: 'valentin.stamate@info.uaic.ro',
        admin: true,
    });
    const userB = await UserModel.create({
        identifier: 'marin',
        email: 'marin@gmail.com',
        alternativeEmail: 'avramescu.marin@info.uaic.ro',
    });

    const scArticleISI = await ScientificArticleISIModel.create({
        observations: 'Ana are mere',
        userId: 1,
    });
}