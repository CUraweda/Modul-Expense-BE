const httpStatus = require('http-status-codes');
const { ValidationError, UnauthorizedError } = require('./errors.exception');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const APP_DEBUG = process.env.APP_DEBUG; 

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof ValidationError) {
        res.status(httpStatus.StatusCodes.BAD_REQUEST);
        return res.json({
            errors: {
                status: httpStatus.StatusCodes.BAD_REQUEST,
                data: null,
                error: {
                    code : err.name,
                    message: err.validationMessage,
                }
            }
        });
    }

    if (err instanceof PrismaClientKnownRequestError) {
        return res.json({
            errors: {
                status: res.statusCode,
                data: null,
                error: {
                    code : err.name,
                    message: err?.meta?.target || err,
                }
            }
        });
    }

    const statusCode = err.statusCode || httpStatus.StatusCodes.INTERNAL_SERVER_ERROR || 500;
    res.status(statusCode);

    return res.json({
        errors: {
            status: res.statusCode,
            data: null,
            error: {
                code : err.name,
                message: err.message,
                trace : APP_DEBUG && res.statusCode !== httpStatus.StatusCodes.NOT_FOUND ? err.stack : undefined
            }
        }
    });
};