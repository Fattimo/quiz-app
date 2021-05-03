const { Pool } = require('pg')
const config = require("../config")

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: config.db_name,
  password: config.db_password,
  post: 5432
})

module.exports = pool