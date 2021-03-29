const bcrypt = require('bcrypt');
const { User } = require('../models');

const createUser = async (username, password, user_details) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const userDetails = await User.create({
    username,
    password: hashedPassword,
    user_details,
  });
  return userDetails;
};

module.exports = { createUser };
