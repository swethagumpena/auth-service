const express = require('express');

const { loginHandler } = require('../handlers/login.handler');

const router = express.Router();

router.post('', loginHandler);

module.exports = {
  router,
};
