const httpStatus = require("http-status-codes")

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = httpStatus.StatusCodes.UNAUTHORIZED;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class GeneralError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class ValidationError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.validationMessage = message;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = { UnauthorizedError, GeneralError, ValidationError };
