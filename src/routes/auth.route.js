const express = require('express');

const { authHandler } = require('../handlers/auth.handler');

const router = express.Router();

router.post('', authHandler);

module.exports = {
  router,
};
