import {TablesCrudRepository} from "./crud/tables.crud.repository";
import {
    AcademyMember, Activation, Authentication,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember, Id,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication,
    Translation,
    User, WithoutActivity
} from "../models";
import {QueryDB} from "../connection";

/** An extension to TablesCrudRepository.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer.*/
export class TablesRepository extends TablesCrudRepository {

    /* Id */
    static async getIdByIdentifier(identifier: string) {
        const query = `SELECT * FROM ids WHERE identifier = $1`;
        const params = [identifier];

        const {rows} = await QueryDB(query, params);

        if (rows.length === 1) {
            return new Id(rows[0])
        }

        return null;
    }

    /* Autentificare */
    static async deleteAuthenticationByUser(userId: number) {
        const query = `DELETE FROM authentication WHERE user_id = $1`;
        const params = [userId];

        await QueryDB(query, params);
    }

    static async getAuthenticationByUser(userId: number): Promise<Authentication[]> {
        const query = `SELECT * FROM authentication WHERE user_id = $1`;
        const params = [userId];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    static async getAuthenticationByKey(key: string): Promise<Authentication[]> {
        const query = `SELECT * FROM authentication WHERE auth_key = $1`;
        const params = [key];

        const {rows} = await QueryDB(query, params);
        const list: Authentication[] = [];

        for (const row of rows) {
            list.push(new Authentication(row));
        }

        return list;
    }

    /* Activare */
    static async deleteActivationByUser(userId: number) {
        const query = `DELETE FROM activation WHERE user_id = $1`;
        const params = [userId];

        await QueryDB(query, params);
    }

    static async getActivationByUser(userId: number): Promise<Activation[]> {
        const query = `SELECT * FROM activation WHERE user_id = $1`;
        const params = [userId];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

    static async getActivationByKey(key: string): Promise<Activation[]> {
        const query = `SELECT * FROM activation WHERE activation_key = $1`;
        const params = [key];

        const {rows} = await QueryDB(query, params);
        const list: Activation[] = [];

        for (const row of rows) {
            list.push(new Activation(row));
        }

        return list;
    }

}