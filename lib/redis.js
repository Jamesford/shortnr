import redis  from 'redis';
import config from '../config';

var exports = module.exports = {};

// Init Redis Connection
let redisClient = exports.redisClient = redis.createClient(config.redis.port, config.redis.host, { no_ready_check: true });

// Test Redis connection & functioning
redisClient.set('redis', 'working');
redisClient.get('redis', (redisErr, reply) => {
  if (redisErr) { return console.log(redisErr); }
});
