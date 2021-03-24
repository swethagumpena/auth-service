const redis = require('redis');
const dotenv = require('dotenv');
const { redisClient } = require('./redis.client');

dotenv.config();

const storeToken = (token, username) => {
  redisClient.setex(token, process.env.REDIS_EXPIRY_TIME, username, redis.print);
};

const retrieveToken = (token) => new Promise((resolve, reject) => {
  redisClient.get(token, (error, value) => {
    if (error) reject(error);
    resolve(value);
  });
});

const deleteToken = async (token) => {
  await redisClient.DEL(token, redis.print);
};

module.exports = { storeToken, retrieveToken, deleteToken };
