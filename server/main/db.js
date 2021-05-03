const { Pool } = require('pg')
const config = require("../config")

const isProduction = process.env.NODE_ENV == 'production'
const connectConfig = isProduction ? 
    { ssl: true, connectionString: process.env.DATABASE_URL } : 
    {
        user: 'postgres',
        host: 'localhost',
        database: config.db_name,
        password: config.db_password,
        post: 5432
      }
const pool = new Pool(connectConfig)

module.exports = pool