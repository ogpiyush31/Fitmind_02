const mysql = require('mysql2/promise');
require('dotenv').config(); // Load variables from .env

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fitmind_db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  ssl: {
    rejectUnauthorized: true, // Required for Railway public connections
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
