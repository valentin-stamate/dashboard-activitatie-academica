import {User} from "../../models";
import {QueryDB} from "../../connection";

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
     * Adds a new user to database. */
    static async addUser(payload: User) {
        const query = `INSERT INTO users(identifier, email, password) VALUES ($1, $2, $3)`;

        const params = [payload.identifier, payload.email, payload.password];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** Users - READ |
     * @return a user instance or null if is not found */
    static async getUserById(id: number): Promise<User | null> {
        const query = "SELECT * FROM users WHERE id = $1";

        try {
            const {rows} = await QueryDB(query, [id]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            throw e;
        }
    }

    /** Users - UPDATE |
     * Update the user information. */
    static async updateUser(payload: User) {
        const query = `UPDATE users SET identifier = $2, email = $3, password = $4 WHERE id = $1`;

        const params = [payload.id, payload.identifier, payload.email, payload.password];

        try {
            await QueryDB(query, params);
        } catch (e) {
            throw e;
        }
    }

    /** Users - DELETE |
     * Deletes a user. */
    static async deleteUser(payload: User) {
        const query = `DELETE FROM users WHERE id = $1`;

        try {
            await QueryDB(query, [payload.id]);
        } catch (e) {
            throw e;
        }
    }
}