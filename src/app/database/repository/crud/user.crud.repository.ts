import {User} from "../../models";
import {QueryDB} from "../../connection";

/** User CRUD repository.
 * Every method throws an exception if something is wrong.
 * The exception is handled in the Service layer. */
export abstract class UserCrudRepository {

    /** Users - ALL |
     * Returns a list of all the users. */
    static async allUsers(): Promise<User[]> {
        const list: User[] = [];
        const query = 'SELECT * FROM users';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            list.push(new User(row));
        }

        return list;
    }

    /** Users - CREATE |
     * Adds a new user.test.ts to database. */
    static async addUser(payload: User) {
        const query = `INSERT INTO users(identifier, email) VALUES ($1, $2) RETURNING *`;

        const params = [payload.identifier, payload.email];
        const {rows} = await QueryDB(query, params);
        return rows;
    }

    /** Users - READ |
     * @return a user.test.ts instance or null if is not found */
    static async getUserById(id: number): Promise<User | null> {
        const query = "SELECT * FROM users WHERE id = $1";

        const {rows} = await QueryDB(query, [id]);

        if (rows.length === 1) {
            return new User(rows[0]);
        }

        return null;
    }

    /** Users - UPDATE |
     * Update the user.test.ts information. */
    static async updateUser(payload: User) {
        const query = `UPDATE users SET identifier = $2, email = $3 WHERE id = $1`;

        const params = [payload.id, payload.identifier, payload.email];

        await QueryDB(query, params);
    }

    /** Users - DELETE |
     * Deletes a user.test.ts. */
    static async deleteUser(payload: User) {
        const query = `DELETE FROM users WHERE id = $1`;

        await QueryDB(query, [payload.id]);
    }
}