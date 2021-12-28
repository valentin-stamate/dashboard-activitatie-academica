import {ErrorResponse, Information, User} from "../models";
import {QueryDB} from "../connection";

/** User repository. Used for CRUD operations. */
export abstract class UserRepository {

    /** Activates a user */
    // static async activateUser(user: User): Promise<boolean> {
    //     const query = "UPDATE users SET activated = TRUE WHERE identifier = $1";
    //
    //     try {
    //         await QueryDB(query, [user.identifier]);
    //     } catch (e) {
    //         console.log(e);
    //
    //         return false;
    //     }
    //
    //     return true;
    // }

    /** Given a user, it gives the admin permission. */
    // static async makeAdminUser(user: User): Promise<boolean> {
    //     const query = "UPDATE users SET admin = TRUE WHERE identifier = $1";
    //
    //     try {
    //         await QueryDB(query, [user.identifier]);
    //     } catch (e) {
    //         console.log(e);
    //
    //         return false;
    //     }
    //
    //     return true;
    // }

    /** Adds a new user to database.
     * @return null if the user was added \n
     *         an ErrorResponse instance if the operation fails */
    // static async addUser(user: User): Promise<null | ErrorResponse> {
    //     const query = "INSERT INTO users(identifier, email, password) VALUES ($1, $2, $3)";
    //
    //     const userById = await UserRepository.getUserByIdentifier(user.identifier);
    //     if (userById) {
    //         return new ErrorResponse('User id already taken.');
    //     }
    //
    //     const userByEmail = await UserRepository.getUserByEmail(user.email);
    //     if (userByEmail) {
    //         return new ErrorResponse('Email already taken.');
    //     }
    //
    //     try {
    //         await QueryDB(query, [user.identifier, user.email, user.password]);
    //     } catch (e) {
    //         console.log(e);
    //
    //         return new ErrorResponse('Error');
    //     }
    //
    //     return null;
    // }

    /** Return a user with the given id
    //  * @return a user instance if found, null otherwise */
    // static async getUserById(id: number): Promise<User | null> {
    //     const query = "SELECT * FROM users WHERE id = $1";
    //
    //     try {
    //         const {rows} = await QueryDB(query, [id]);
    //
    //         if (rows.length === 1) {
    //             return new User(rows[0]);
    //         }
    //
    //         return null;
    //     } catch (e) {
    //         return null;
    //     }
    // }

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

    /* Informații */
    static async getUserInformation(user: User) {
        const query = `SELECT *
                       FROM (SELECT * FROM users WHERE id = $1) u
                       JOIN user_information ui ON u.id = ui.user_id
                       JOIN information r ON r.id = ui.relation_id;`

        try {
            const {rows} = await QueryDB(query, [user.id]);

            if (rows.length === 0) {
                return null;
            }

            return new Information(rows[0]);
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }

    /* Articole ştiintifice publicate în extenso...(ISI) */

    /* ISI proceedings */

    /* Articole științifice publicate în extenso... (BDI) */

    /* Cărţi ştiinţifice sau capitole de cărți publicate în edituri */

    /* Traduceri */

    /* Comunicări în manifestări științifice */

    /* Brevete */

    /* Contracte de cercetare */

    /* Citări */

    /* Premii si nominalizari */

    /* Membru în academii */

    /* Membru în echipa editorială */

    /* Evenimente organizate */

    /* Fără activitate științifică */

    /* Activitate didactică */



}