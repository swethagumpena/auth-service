/* eslint-disable camelcase */
const { User } = require('../models');

const createUser = async (username, password, user_details) => {
  const userDetails = await User.create({
    username,
    password,
    user_details,
  });
  return userDetails;
};

module.exports = { createUser };
