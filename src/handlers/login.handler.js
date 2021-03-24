/* eslint-disable camelcase */
const loginService = require('../services/login.service');

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginService.loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error.message === 'Unauthenticated') {
      return res.status(401).send(error.message);
    }
    return res.status(500).send(error.message);
  }
};

module.exports = {
  loginHandler,
};
