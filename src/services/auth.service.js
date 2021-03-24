const jwt = require('jsonwebtoken');
const redisUtil = require('../utils/redis.util');
const jwtUtil  = require('../utils/jwt.util');

const authenticateService = async (jwtToken) => {
  await jwtUtil.jwtVerify(jwtToken);
  const userData = await redisUtil.retrieveToken(jwtToken);
  return userData;
};

module.exports = { authenticateService };
