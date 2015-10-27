import redis  from 'redis';
import config from '../config';

var exports = module.exports = {};

// Init Redis Connection
let redisClient = exports.redisClient = redis.createClient(config.redis.port, config.redis.host, { no_ready_check: true });

// Confirm redis is working
redisClient.set('redis', 'working');
redisClient.get('redis', (redisErr, reply) => {
  if (redisErr) { return console.log(redisErr); }
  console.log('Redis connection OK')
});
