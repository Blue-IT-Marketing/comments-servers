const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");

const PORT = process.env.PORT || 3030;
const redis = require("redis");
const cache_config = { redis: process.env.REDIS_URL || config.get("redis") };
const cache = require("express-redis-cache")({
  client: redis.createClient(cache_config.redis)
});


