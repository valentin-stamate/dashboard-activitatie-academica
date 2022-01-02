/** This interface contains only user specific operations.
 * The form association is defined in another interface. */
import {AuthToken, Information, User} from "../../database/models";
import {ServiceResponse} from "../service.response";

export interface UserServiceInterface {
    /************************************************************
     *                    UNKNWON USER ONLY
     * **********************************************************/

    /** Sign up a user. After the request an email is sent with the activation key. */
    signUpUser(user: User): Promise<ServiceResponse>;

    /** With the given auth key send to the user's email, if it's valid mark the user as activated. */
    activateUser(activationKey: string): Promise<ServiceResponse>;

    /** When the user logs in, the first part is to send a login key to his email. */
    sendAuthKey(user: User): Promise<ServiceResponse>;

    /** When the user logs in, the second part is to attach the key that was sent to his email.
     * If all is valid, return the JWT token. */
    logInUser(user: User, authKey: string): Promise<ServiceResponse>;

    /************************************************************
     *                       USER ONLY
     * **********************************************************/

    /* Informații */
    getInformation(token: AuthToken): Promise<ServiceResponse>;
    editInformation(token: AuthToken, data: Information): Promise<ServiceResponse>;
    deleteInformation(token: AuthToken, data: Information): Promise<ServiceResponse>;

    /* Articole științifice publicate în extenso în reviste cotate... (ISI) */

    /* ISI proceedings */

    /* Articole științifice publicate în extenso în revi... (BDI) */

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */

    /* Traduceri */

    /* Comunicări în manifestări științifice */

    /* Brevete */

    /* Contracte de cercetare */

    /* Citări */

    /* Premii si nominalizări */

    /* Membru în academii */

    /* Membru în echipa editorială */

    /* Evenimente organizate */

    /* Fără activitate științifică */

    /* Activitate didactică */

    /************************************************************
     *                    ADMIN USER ONLY
     * **********************************************************/

    /** Admin permission only. Change user information. */
    // editUser(): void;

    /** Admin permission only. Deactivates the user. It can be reactivated after. */
    // deactivateUser(): void;

    /** Admin permission only. Make another admin user. */
    // makeAdminPermission(): void;

    /** Admin permission only. Remove admin permission. */
    // removeAdminPermission(): void;

    /** Admin permission only. Remove user. */
    // removeUser(): void;
}