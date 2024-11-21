const jwt = require('jsonwebtoken');
const fs = require('fs');
const { GeneralError, UnauthorizedError } = require('../exceptions/errors.exception');
const httpStatus = require("http-status-codes")

const privateKey = fs.readFileSync('secrets/private.pem', 'utf8');
const publicKey = fs.readFileSync('secrets/public.pem', 'utf8');

const generateAccessToken = async (userId, username) => {
    const payload = {
        userId: userId,
        username: username,
    }
    
    return jwt.sign(payload, privateKey, { 
        algorithm: 'RS256',
        expiresIn: '15m' 
    });
}

const getTokenExpires = async (token) => {
    const decoded = jwt.decode(token);

    if (decoded && decoded.exp) {
        return decoded.exp
    } else {
        console.error('Failed to decode token or missing exp/iat fields');
        return null;
    }
}

const generateRefreshToken = async (userId, username) => {
    const payload = {
        userId: userId,
        username: username,
        is_refresh: true
    }

    return jwt.sign(payload, privateKey, { 
        algorithm: 'RS256',
        expiresIn: '3d' 
    });
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new jwt.TokenExpiredError("Expired Token", httpStatus.StatusCodes.FORBIDDEN);        
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            throw new jwt.JsonWebTokenError("Invalid Token", httpStatus.StatusCodes.FORBIDDEN);        
        }

    }
}

module.exports = { generateAccessToken, generateRefreshToken, getTokenExpires, verifyToken }