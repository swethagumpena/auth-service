const express = require('express');

const { logoutHandler } = require('../handlers/logout.handler');

const router = express.Router();

router.post('', logoutHandler);

module.exports = {
  router,
};
