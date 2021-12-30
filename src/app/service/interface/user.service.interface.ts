/** This interface contains only user specific operations.
 * The form association is defined in another interface. */
import {User} from "../../database/models";
import {ServiceResponse} from "../service.response";

export interface UserServiceInterface {
    /** Adds a user to database. */
    addUser(user: User): Promise<ServiceResponse>;

    /** Change user information. */
    editUser(): void;

    /** Sends an email with a key to activate the user. */
    sendActivationEmail(): void;

    /** Sends an email with the login key. This key will replace the password. */
    loginUser(user: User): Promise<ServiceResponse>;

    /** Marks a user as activated. */
    activateUser(activationKey: string): Promise<ServiceResponse>;

    /** Deactivates the user. It can be reactivated after. */
    deactivateUser(): void;

    /** Admin permission only. Make another admin user. */
    makeAdminPermission(): void;

    /** Admin permission only. Remove admin permission. */
    removeAdminPermission(): void;

    /** Admin permission only. Remove user. */
    removeUser(): void;
}