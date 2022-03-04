import {Env} from "../../../../env";

import {DataTypes, Model, Optional, Sequelize} from '@sequelize/core';
import {BaseInformation} from "./models";
const sequelize = new Sequelize(Env.DB_NAME, Env.DB_USERNAME, Env.DB_PASSWORD, {
    host: Env.DB_HOST,
    dialect: 'postgres',
});

class BaseInformationModel extends Model {}

export async function sequelizeInit() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    BaseInformationModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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

    await sequelize.sync({ force: true });

    const row = BaseInformationModel.build({fullName: 'sdasdad', identifier: 'dasdasdsa'});

    const savedRow = (await row.save()).toJSON() as BaseInformation;
    console.log(savedRow);

}
