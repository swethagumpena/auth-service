const jwt = require('jsonwebtoken');
const { retrieveToken } = require('../utils/redis.util');

const authenticateService = async (jwtToken) => {
  await jwt.verify(jwtToken, process.env.JWT_SECRET, (err) => {
    if (err) {
      throw err;
    }
  });
  const userData = await retrieveToken(jwtToken);
  return userData;
};

module.exports = { authenticateService };
