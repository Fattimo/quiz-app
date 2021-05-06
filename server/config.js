require('dotenv').config()

module.exports = {
    db_user: process.env.DB_USER || 'postgres',
    db_host: process.env.DB_HOST || 'localhost',
    db_port: parseInt(process.env.DB_PORT) || 5432,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD
}