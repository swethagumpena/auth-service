/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const redisUtils = require('../utils/redis.utils');

const logoutHandler = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const retrivedToken = await redisUtils.retrieveToken(token);
    if (retrivedToken) {
      await redisUtils.deleteToken(token);
      res.status(200).json({ message: 'logged out successfully ' });
    } else {
      res.status(400).json({ message: 'user not found ' });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  logoutHandler,
};
