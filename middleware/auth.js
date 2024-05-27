require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getToken = (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization !== undefined && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          const error = new Error("Invalid Credential 😡");
          error.statusCode = 401;
          throw error;
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      const error = new Error("You need to login first 😠");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = getToken;
