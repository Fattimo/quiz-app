require('dotenv').config()

module.exports = {
    db_user: 'postgres',
    db_host: 'localhost',
    db_port: 5432,
    db_db: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD
}