// const jwt = require('jsonwebtoken');
const redisUtil = require('../utils/redis.util');
const jwtUtil  = require('../utils/jwt.util');

const authenticateService = async (jwtToken) => {
  const decoded = await jwtUtil.jwtVerify(jwtToken);
  const userData = await redisUtil.retrieveToken(jwtToken);
  // return userData;
  // return decoded;
  if (userData) {
    return decoded;
  }
  return null;
};


module.exports = { authenticateService };
