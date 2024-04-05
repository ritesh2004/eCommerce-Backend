class Apierror {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = Apierror;
