const config = require("config");
const redis = require("redis");

const cache_config = { redis: process.env.REDIS_URL || config.get("redis") };

let cache;
try {
  cache = require("express-redis-cache")({
    client: redis.createClient(cache_config.redis)
  });
} catch (error) {
  console.log(error.message);
}
