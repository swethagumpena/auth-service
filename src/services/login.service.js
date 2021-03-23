/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { redisClient } = require('../redis');

const createUser = async (username, password, user_details) => {
  User.findOrCreate({
    where: { username },
    defaults: { username, password, user_details },
  });

  const jwtToken = jwt.sign({ username },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });

  await redisClient.setex(jwtToken, process.env.REDIS_EXPIRY_TIME, username);
  return jwtToken;
};
module.exports = { createUser };
