import {ErrorResponse, User} from "../models";
import {QueryDB} from "../connection";

/** User repository. Used for CRUD operations. */
export abstract class UserRepository {
    /** Returns all the users. */
    static async allUsers(): Promise<User[]> {
        const users: User[] = [];
        const query = 'SELECT * FROM users';

        const {rows} = await QueryDB(query, []);

        for (const row of rows) {
            users.push(new User(row));
        }

        // await UtilService.sleep(10000);

        return users;
    }

    /** Activates a user */
    static async activateUser(user: User): Promise<boolean> {
        const query = "UPDATE users SET activated = TRUE WHERE identifier = $1";

        try {
            await QueryDB(query, [user.identifier]);
        } catch (e) {
            console.log(e);

            return false;
        }

        return true;
    }

    /** Given a user, it gives the admin permission. */
    static async makeAdminUser(user: User): Promise<boolean> {
        const query = "UPDATE users SET admin = TRUE WHERE identifier = $1";

        try {
            await QueryDB(query, [user.identifier]);
        } catch (e) {
            console.log(e);

            return false;
        }

        return true;
    }

    /** Adds a new user to database.
     * @return null if the user was added \n
     *         an ErrorResponse instance if the operation fails */
    static async addUser(user: User): Promise<null | ErrorResponse> {
        const query = "INSERT INTO users(identifier, email, password) VALUES ($1, $2, $3)";

        const userById = await UserRepository.getUserByIdentifier(user.identifier);
        if (userById) {
            return new ErrorResponse('User id already taken.');
        }

        const userByEmail = await UserRepository.getUserByEmail(user.email);
        if (userByEmail) {
            return new ErrorResponse('Email already taken.');
        }

        try {
            await QueryDB(query, [user.identifier, user.email, user.password]);
        } catch (e) {
            console.log(e);

            return new ErrorResponse('Error');
        }

        return null;
    }

    /** Return a user with the given id
     * @return a user instance if found, null otherwise */
    static async getUserById(id: number): Promise<User | null> {
        const query = "SELECT * FROM users WHERE id = $1";

        try {
            const {rows} = await QueryDB(query, [id]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    /** Return a user with the given identifier
     * @return a user instance if found, null otherwise */
    static async getUserByIdentifier(identifier: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE identifier = $1";

        try {
            const {rows} = await QueryDB(query, [identifier]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    /** Return a user that matches the mail given.
     * @return a user instance if found, null otherwise */
    static async getUserByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = $1";

        try {
            const {rows} = await QueryDB(query, [email]);

            if (rows.length === 1) {
                return new User(rows[0]);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

}