import {
    DataTypes,
    HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin, InferAttributes, InferCreationAttributes,
    Model,
    Sequelize
} from '@sequelize/core';
import {BaseInformation, ScientificArticleISI, User, UserKey} from "./models";

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

/** --------------------============== Table Initialization ==============-------------------- */
export class BaseInformationModel extends Model {}
BaseInformationModel.init( {
    fullName:   {type: DataTypes.STRING, allowNull: false,},
    identifier: {type: DataTypes.STRING, allowNull: false, unique: true,},
}, {...options, modelName: 'base_information'});


export class UserModel extends Model {}
UserModel.init({
    identifier:       {type: DataTypes.STRING, unique: true, allowNull: false,},
    email:            {type: DataTypes.STRING, unique: true, allowNull: false,},
    alternativeEmail: {type: DataTypes.STRING, unique: true, allowNull: false,},
    admin:            {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,},
}, {...options, modelName: 'user'});

export class UserKeyModel extends Model {}
UserKeyModel.init({
    identifier: {type: DataTypes.STRING, unique: true, allowNull: false,},
    key:        {type: DataTypes.STRING, unique: true, allowNull: false,},
}, {...options, modelName: 'user_key'});

/** --------------------============== Forms ==============-------------------- */
export class ScientificArticleISIModel extends Model {}
ScientificArticleISIModel.init({
    observations: {type: DataTypes.STRING,},
}, {...options, modelName: 'sc_article_isi'});
UserModel.hasMany(ScientificArticleISIModel);

export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    UserModel.hasMany(ScientificArticleISIModel);

    await sequelize.sync({ force: true });

    await BaseInformationModel.build({fullName: 'Stamate Valentin', identifier: 'valentin'}).save();
    const user = await UserModel.build({identifier: 'valentin',
        email: 'stamatevalentin125@gmail.com', alternativeEmail: 'valentin.stamate@info.uaic.ro', admin: true}).save();
    const isiRow = await ScientificArticleISIModel.build({observations: 'Artical', userId: 1}).save();
    console.log(isiRow);
}