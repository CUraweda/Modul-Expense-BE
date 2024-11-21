const httpStatus = require("http-status-codes");
const authService = require("../services/auth.service")
const { ValidationError, GeneralError } = require("../../exceptions/errors.exception");
const { loginSchema } = require("../validations/login.schema");

const login = async (req, res, next) => {
    console.log('value');
    try {
        const {error, value} = loginSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            throw new ValidationError(error);
        }

        const {email, password} = value;
        const user = await authService.login(email, password);
        
        return res.status(httpStatus.OK).json({
            status :  httpStatus.OK,
            data : user,
            error: null
        });
    } catch (err) {
        console.log(err);
        
        next(err)
    }
};

module.exports = { login }