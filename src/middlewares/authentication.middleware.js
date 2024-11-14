const httpStatus = require("http-status-codes");
const { UnauthorizedError } = require("../exceptions/errors.exception");
const jwtHelper = require("../helpers/jwt.helper");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(httpStatus.StatusCodes.UNAUTHORIZED);
    return res.json({
      errors: {
        status: httpStatus.StatusCodes.UNAUTHORIZED,
        data: null,
        error: {
          code: "TOKEN_NOT_FOUND",
          message: "Token Not Found",
        },
      },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Memverifikasi token
    const decoded = await jwtHelper.verifyToken(token);

    // Menyimpan informasi pengguna di request untuk digunakan di route berikutnya
    req.user = decoded;

    // Lanjut ke middleware atau route handler berikutnya
    next();
  } catch (err) {
    var code = "INVALID_TOKEN";
    if (err instanceof TokenExpiredError) {
      code = "TOKEN_EXPIRED";
    }

    res.status(httpStatus.StatusCodes.FORBIDDEN);
    return res.json({
      errors: {
        status: httpStatus.StatusCodes.FORBIDDEN,
        data: null,
        error: {
          code: code,
          message: "Invalid or Expired Token",
        },
      },
    });
  }
};

module.exports = { authentication };
