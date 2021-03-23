const redis = require('redis');
const dotenv = require('dotenv');
const { client } = require('./redis.client');

dotenv.config();

const storeToken = (token, username) => {
  client.setex(token, process.env.ACCESS_TOKEN_EXPIRY_TIME, username, redis.print);
};

const retrieveToken = (token) => {
  const userData = client.getex(token, redis.print);
  if (userData === null) {
    throw new Error('Invalid User');
  }
  return userData;
};

module.exports = { storeToken, retrieveToken };
