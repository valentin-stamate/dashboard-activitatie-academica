import {ServiceResponse} from "../service.response";
import {AuthToken, Id, User} from "../../database/models";

/** User admin interface that describes how an admin user
 * interacts with other users. */
export interface UserAdminServiceInterface {
    /************************************************************
     *                    ADMIN USER ONLY
     * **********************************************************/

    /** Read all Id's */
    getAllIds(): Promise<ServiceResponse>;

    /** Add an Id */
    addId(id: Id): Promise<ServiceResponse>;

    /** Remove an Id */
    removeId(id: Id): Promise<ServiceResponse>;

    /** Read all users */
    getAllUsers(authToken: AuthToken): Promise<ServiceResponse>;

    /** Deactivates the user. It can be reactivated after. */
    deactivateUser(user: User): Promise<ServiceResponse>;

    /** Activates the user. It can be deactivated after. */
    activateUser(user: User): Promise<ServiceResponse>;

    /** Gives a user the admin privilege. */
    makeUserAdmin(user: User): Promise<ServiceResponse>;

    /** Gives a user the admin privilege. */
    removeUserAdmin(user: User): Promise<ServiceResponse>;

    /** Removes a user. */
    removeUser(user: User): Promise<ServiceResponse>;
}