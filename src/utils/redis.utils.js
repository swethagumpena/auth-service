const redis = require('redis');
const dotenv = require('dotenv');
const { client } = require('./redis.client');

dotenv.config();

const storeToken = (token, username) => {
  client.setex(token, process.env.ACCESS_TOKEN_EXPIRY_TIME, username, redis.print);
};

const retrieveToken = (token) => new Promise((resolve, reject) => {
  client.get(token, (err, reply) => {
    resolve(reply);
    if (err) reject(err);
  });
});

const deleteToken = async (token) => {
  await client.DEL(token, redis.print);
};

module.exports = { storeToken, retrieveToken, deleteToken };
