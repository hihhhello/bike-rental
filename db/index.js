const Pool = require("pg").Pool;
const config = require("config");
const pool = new Pool({
  user: config.get("DB_USER"),
  password: config.get("DB_PASS"),
  host: config.get("DB_HOST"),
  port: config.get("DB_PORT"),
  database: config.get("DB_NAME"),
});

module.exports = pool;
