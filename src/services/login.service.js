/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User } = require('../models');
const redisUtils = require('../utils/redis.util');

const loginUser = async (email, password) => {

  const user = await User.findOne({
    where: {
      username:email,
    },
  });
  let user_details;

  if (user){
   user_details = user.user_details;
  } else {
    throw new Error('No user registered with this name');
  }
  
  // password-hashed password coming from DB, user.password-coming from login request
  if (await bcrypt.compare(password, user.password)) {
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME });
    await redisUtils.storeToken(jwtToken, email);
    return jwtToken;
  }
  // if (user) {
  //   const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY,
  //     { expiresIn: process.env.JWT_EXPIRY_TIME });
  //   await redisUtils.storeToken(jwtToken, username);
  //   return jwtToken;
  // }
  throw new Error('Unauthenticated');
};

module.exports = { loginUser };
