import {
    AcademyMember,
    AwardAndNomination,
    Citation, DidacticActivity, EditorialMember,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI,
    ScientificBook, ScientificCommunication, Translation,
    User, WithoutActivity
} from "../models";
import {QueryDB} from "../connection";
import {UserCrudRepository} from "./crud/user.crud.repository";

/** An extension to User Repository. Used for CRUD operations.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer. */
export class UserRepository extends UserCrudRepository {

    /** Users - ALL |
     * Returns a list of all the users exept the one given. */
    static async allUsersExcept(exceptId: number): Promise<User[]> {
        const list: User[] = [];
        const query = 'SELECT * FROM users WHERE id != $1';

        const {rows} = await QueryDB(query, [exceptId]);

        for (const row of rows) {
            list.push(new User(row));
        }

        return list;
    }

    static async setUserActivationStatus(user: User, status: boolean) {
        const query = `UPDATE users SET activated = $2 WHERE id = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [user.id, status]);
        return rows;
    }

    static async setUserAdminStatus(user: User, status: boolean) {
        const query = `UPDATE users SET admin = $2 WHERE id = $1 RETURNING *`;

        const {rows} = await QueryDB(query, [user.id, status]);
        return rows;
    }

    /** Return a user.test.ts with the given identifier
     * @return a user.test.ts instance if found, null otherwise */
    static async getUserByIdentifier(identifier: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE identifier = $1`;

        const {rows} = await QueryDB(query, [identifier]);

        if (rows.length === 1) {
            return new User(rows[0]);
        }

        return null;
    }

    /** Return a user.test.ts that matches the mail given.
     * @return a user.test.ts instance if found, null otherwise */
    static async getUserByEmail(email: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE email = $1`;

        const {rows} = await QueryDB(query, [email]);

        if (rows.length === 1) {
            return new User(rows[0]);
        }

        return null;
    }

}