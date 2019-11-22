const config = require("config");
const redis = require("redis");

const cache_config = { redis: process.env.REDIS_URL || config.get("REDIS") };

let cache;
try {
  cache = require("express-redis-cache")({ client: redis.createClient(cache_config.redis)});
  console.log('redis cache connected');
} catch (error) {
  console.log('error connecting with redis server',error.message);
}

module.exports = {
    redis_cache : cache
};