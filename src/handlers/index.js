const { handler: healthHandler } = require('./health.handler');
const { loginHandler } = require('./login.handler');
const { registerHandler } = require('./register.handler');

module.exports = {
  healthHandler,
  loginHandler,
  registerHandler,
};
