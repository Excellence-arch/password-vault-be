const jwt = require("jsonwebtoken");
const { jwtExpiryTime } = require("../constants");

const jwtSecret = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiryTime });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { createToken, verifyToken };
