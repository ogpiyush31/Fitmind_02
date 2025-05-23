const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // ✅ Add port from env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // ✅ For Railway SSL
  }
});

// Optional: quick connection test to log status
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL pool connected successfully.');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL pool connection failed:', err);
  }
})();

module.exports = pool;


