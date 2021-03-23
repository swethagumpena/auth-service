/* eslint-disable camelcase */
const loginService = require('../services/login.service');

const loginHandler = async (req, res) => {
  try {
    const { username, password, user_details } = req.body;
    const loginUser = await loginService.createUser(username, password, user_details);
    res.status(201).send(loginUser);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  loginHandler,
};
