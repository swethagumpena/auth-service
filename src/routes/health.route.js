const express = require('express');

const { healthHandler } = require('../handlers');

const router = express.Router();

router.get('', healthHandler);

module.exports = {
  router,
};
