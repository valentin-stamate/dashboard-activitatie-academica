import {
    Association,
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
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

export class UserModel extends Model {
    declare getISIArticles: HasManyGetAssociationsMixin<ScientificArticleISIModel>; // Note the null assertions!
    declare addISIArticle: HasManyAddAssociationMixin<ScientificArticleISIModel, number>;
    declare addISIArticles: HasManyAddAssociationMixin<ScientificArticleISIModel, number>;
    declare setISIArticles: HasManySetAssociationsMixin<ScientificArticleISIModel, number>;
    declare removeISIArticle: HasManyRemoveAssociationMixin<ScientificArticleISIModel, number>;
    declare removeISIArticles: HasManyRemoveAssociationsMixin<ScientificArticleISIModel, number>;
    declare hasISIArticle: HasManyHasAssociationMixin<ScientificArticleISIModel, number>;
    declare hasISIArticles: HasManyHasAssociationsMixin<ScientificArticleISIModel, number>;
    declare countISIArticles: HasManyCountAssociationsMixin;
    declare createISIArticle: HasManyCreateAssociationMixin<ScientificArticleISIModel, 'ownerId'>;
}

UserModel.init(
    {
        identifier: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        admin: {
            type: new DataTypes.BOOLEAN,
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        alternativeEmail: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
    },
    {
        tableName: 'users',
        sequelize // passing the `sequelize` instance is required
    }
);

class ScientificArticleISIModel extends Model { }
ScientificArticleISIModel.init({
        observations: {type: DataTypes.STRING,},
    },
    {
        sequelize,
        tableName: 'sc_articles_isi'
    }
);

UserModel.hasMany(ScientificArticleISIModel, {
    sourceKey: 'id',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    as: 'ISIArticles', // this determines the name in `associations`!
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});









export class UserKeyModel extends Model {}
UserKeyModel.init({
    identifier: {type: DataTypes.STRING, unique: true, allowNull: false,},
    key:        {type: DataTypes.STRING, unique: true, allowNull: false,},
}, {...options, modelName: 'user_key'});

/** --------------------============== Forms ==============-------------------- */
// export class ScientificArticleISIModel extends Model {}
// ScientificArticleISIModel.init({
//     observations: {type: DataTypes.STRING,},
// }, {...options, modelName: 'sc_article_isi'});

export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await sequelize.sync({ force: true });

    await BaseInformationModel.build({fullName: 'Stamate Valentin', identifier: 'valentin'}).save();
    const user = await UserModel.build({identifier: 'valentin',
        email: 'stamatevalentin125@gmail.com', alternativeEmail: 'valentin.stamate@info.uaic.ro', admin: true}).save();

    const project = await user.createISIArticle({
        observations: 'first!'
    });

    const ourUser = await UserModel.findByPk(1, {
        include: [UserModel.associations.ISIArticles],
        rejectOnEmpty: true,
    })

    console.log(ourUser.toJSON());
    console.log(await ourUser.getISIArticles());
}