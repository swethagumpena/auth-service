/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const redisUtils = require('../utils/redis.util');

const loginUser = async (username, password) => {
  const user = await User.findOne({
    where: {
      username,
      password,
    },

  });
  if (user) {
    const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME });
    await redisUtils.storeToken(jwtToken, username);
    return jwtToken;
  }
  throw new Error('Unauthenticated');
};

module.exports = { loginUser };
