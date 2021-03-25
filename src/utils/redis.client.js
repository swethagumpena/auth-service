const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

const redisClient = redis.createClient({
  host: REDIS_HOST, // container name
  port: REDIS_PORT,
});

redisClient
  .on('connect', () => {
    console.log('Redis connect');
  })
  .on('ready', () => {
    console.log('Redis ready');
  })
  .on('error', (e) => {
    console.log('Redis ready', e);
  })
  .on('close', () => {
    console.log('Redis close');
  })
  .on('reconnecting', () => {
    console.log('Redis reconnecting');
  })
  .on('end', () => {
    console.log('Redis end');
  });

module.exports = { redisClient };
