const responseMessages = {
    OK: "Request Successful"
}

const errorMessages = {

}

class GqlResponse {
    message: String

    constructor(message: String) {
        this.message = message;
    }
}

export {GqlResponse, errorMessages, responseMessages};