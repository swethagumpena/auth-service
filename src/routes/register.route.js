const express = require('express');

const { registerHandler } = require('../handlers/register.handler');

const router = express.Router();

router.post('', registerHandler);

module.exports = {
  router,
};
