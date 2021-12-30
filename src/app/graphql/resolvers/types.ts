export const responseMessages = {
    OK: "Request Successful"
}

export class GqlResponse {
    message: String;

    constructor(message: String) {
        this.message = message;
    }
}
