
/** This interface contains only user specific operations.
 * The form association is defined in another interface. */
export interface UserServiceInterface {
    /** Adds a user to database. */
    addUser(): void;

    /** Change user information. */
    editUser(): void;

    /** Sends an email with a key to activate the user. */
    sendActivationEmail(): void;

    /** Sends an email with the login key. This key will replace the password. */
    loginUser(): void;

    /** Marks a user as activated. */
    activateUser(): void;

    /** Deactivates the user. It can be reactivated after. */
    deactivateUser(): void;

    /** Admin permission only. Make another admin user. */
    makeAdminPermission(): void;

    /** Admin permission only. Remove admin permission. */
    removeAdminPermission(): void;

    /** Admin permission only. Remove user. */
    removeUser(): void;
}