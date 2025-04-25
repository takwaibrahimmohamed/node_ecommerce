const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({userId}, "testkey");
};

module.exports = generateToken;