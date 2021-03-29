/* eslint-disable camelcase */
const loginService = require('../services/login.service');

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('plss',req.body)
    const token = await loginService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    if (error.message === 'Unauthenticated') {
      return res.status(401).send(error.message);
    }
    return res.status(500).send(error.message);
  }
};

module.exports = {
  loginHandler,
};
