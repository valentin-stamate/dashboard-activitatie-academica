
/** For every request to the service layer. A Service Response instance
 * is returned.
 * @param succes is true if the request was successful, false otherwise
 * @param message the message of the response
 * @param payload this will contain the payload for the requests that
 * return something. */
export class ServiceResponse {
    succes: boolean;
    message: string;
    payload: any;

    constructor(succes: boolean, message: string, payload: any) {
        this.succes = succes;
        this.message = message;
        this.payload = payload;
    }
}

export const Responses = {
    OK: 'Successful request.',
    ERROR: 'Request was unsuccessful.',

    EMAIL_TAKEN: 'Email is taken',
    USERNAME_TAKEN: 'Username is already used.',
    USER_ALREADY_CREATED: 'User already created.',
    USER_CREATED: 'The user was created. Check your email for verification.',
    INVALID_KEY: 'Invalid key or user already activated.',
    INVALID_KEY_USER_NOT_FOUND: 'User not found.',
    USER_ACTIVATED: 'User was activated. You can now log in.',
}
