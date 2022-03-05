import {DataTypes, Model, Sequelize} from '@sequelize/core';
require('dotenv').config();

const env = process.env as any;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false,
});

export class BaseInformationModel extends Model {}
export class UserModel extends Model {}
export class UserKeyModel extends Model {}

export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    BaseInformationModel.init({
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize: sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'base_information',
    });

    UserModel.init({
        identifier: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        alternativeEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },{
        sequelize: sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'user',
    });

    UserKeyModel.init({
        identifier: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize: sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'key',
    });

    await sequelize.sync({ force: true });

    await BaseInformationModel.build({fullName: 'Stamate Valentin', identifier: 'valentin'}).save();
    await UserModel.build({identifier: 'valentin',
        email: 'stamatevalentin125@gmail.com', alternativeEmail: 'valentin.stamate@info.uaic.ro', admin: true}).save();

}
