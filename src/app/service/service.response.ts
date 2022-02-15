
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

    constructor(success: boolean, message: string, payload: any = null) {
        this.succes = success;
        this.message = message;
        this.payload = payload;
    }
}

export const Responses = {
    REQUEST_SUCCESS: 'Successful request.',
    REQUEST_ERROR: 'Request was unsuccessful.',

    SUCCESS: 'Success',
    ERROR: 'Error',

    EMAIL_TAKEN: 'Email is taken',
    USERNAME_TAKEN: 'Username is already used.',
    USER_ALREADY_CREATED: 'User already created.',
    ID_ALREADY_EXISTS: 'Identifier already exists.',
    ID_NOT_EXISTS: "Identifier doesn't exist.",
    USER_CREATED: 'The user was created. Check your email for verification.',
    INVALID_IDENTIFIER: "Invalid identifier. It's not listed here",
    INVALID_KEY: 'Invalid key or user already activated.',
    INVALID_TOKEN: 'Invalid token',
    INVALID_KEY_USER_NOT_FOUND: 'User not found.',
    USER_ACTIVATED: 'User was activated. You can now log in.',
    INVALID_CREDENTIALS: 'Invalid credentials.',
    INACTIVE_ACCOUNT: 'Your account was not validated yet. Look into your email address.',
    AUTH_EMAIL_SENT: 'An email was sent with your account.',
    INVALID_AUTH_KEY: 'Invalid key.',
    SOMETHING_WRONG: "This shouldn't happen.",
    MISSING_KEY: 'Missing key',
    INVALID_USER: 'Invalid user.',
    UNAUTHORIZED: 'Unauthorized.',
    UNAUTHORIZED_ACTIVATE_FIRST: 'Unauthorized, activate your account first.',
    UNAUTHORIZED_ONLY_ADMIN: 'Unauthorized, only admin user only.',
    NOT_FOUND: 'Not found.',
    USER_NOT_FOUND: 'User not found.',

}
