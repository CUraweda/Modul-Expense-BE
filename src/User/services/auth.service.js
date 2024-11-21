const httpStatus = require("http-status-codes");
const { GeneralError } = require("../../exceptions/errors.exception");
const bcryptHelper = require("../../helpers/bcrypt.helper")
const userRepository = require("../repositories/user.repository")
const jwtHelper = require("../../helpers/jwt.helper")

const login = async(email, password) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new GeneralError("USER_NOT_FOUND", httpStatus.StatusCodes.NOT_FOUND);
    }

    const compare = await bcryptHelper.compare(password, user.password);
    if (compare) {
        const accessToken = await jwtHelper.generateAccessToken(user?.id, user?.email)
        const refreshToken = await jwtHelper.generateRefreshToken(user?.id, user?.email)
        const expiresIn = await jwtHelper.getTokenExpires(accessToken)
        const token = {
            token_type: "Bearer",
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            role: user?.roleId,
            userId: user?.id
        }

        return token;
    }

    throw new GeneralError("INVALID_PASSWORD", httpStatus.StatusCodes.UNAUTHORIZED);
    
}

module.exports = { login }
