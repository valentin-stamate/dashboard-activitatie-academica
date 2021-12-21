import {Pool} from 'pg';
import {Env} from "../../../env";

const env = Env;

const pool = new Pool({
    user: env.DB_USERNAME,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});

export const QueryDB = (text: string, params: any) => {
    console.log("Executing Query: ", text);
    console.log("Payload: ", params, '\n');

    return pool.query(text, params);
};
