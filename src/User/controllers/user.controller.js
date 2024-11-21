const httpStatus = require("http-status-codes");
const { ValidationError } = require("../../exceptions/errors.exception")
const userService = require("../services/user.service");
const { addUserSchema, updateUserSchema } = require("../validations/user.schema");

const getUsers = async (req, res, next) => {
    try {

        const users = await userService.getUsers();
        
        return res.status(httpStatus.OK).json({
            status :  httpStatus.OK,
            data : users,
            error: null
        });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const {userId} = req.params
        const users = await userService.getUser(userId);
        
        return res.status(httpStatus.OK).json({
            status :  httpStatus.OK,
            data : users,
            error: null
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {error, value} = addUserSchema.validate(req.body, { abortEarly: false });
        console.log(value);
        
        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await userService.createUser(value);

        delete user.password
        
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


const deleteUser = async (req, res, next) => {
    try {
        const {userId} = req.params
        const user = await userService.deleteUser(userId);
        
        return res.status(httpStatus.OK).json({
            status :  httpStatus.OK,
            data : user,
            error: null
        });
    } catch (err) {
        next(err)
    }
};

const updateUser = async (req, res, next) => {
    try {
        const {error, value} = updateUserSchema.validate(req.body, { abortEarly: false });
        if (error) {
            throw new ValidationError(error);
        }

        const {userId} = req.params
        const user = await userService.updateUser(userId, value);
        
        return res.status(httpStatus.OK).json({
            status :  httpStatus.OK,
            data : user,
            error: null
        });
    } catch (err) {
        next(err)
    }
};

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser }