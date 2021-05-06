const { Pool } = require('pg')
const config = require("../config")

const isProduction = process.env.NODE_ENV == 'production'
const connectConfig = isProduction ? 
    {  ssl: {
      rejectUnauthorized: false
    }, connectionString: process.env.DATABASE_URL } : 
    {
        user: config.db_user,
        host: config.db_host,
        database: config.db_name,
        password: config.db_password,
        post: config.db_port
      }
const pool = new Pool(connectConfig)

module.exports = pool