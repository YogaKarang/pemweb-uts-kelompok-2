const mysql = require('mysql2');
require('dotenv').config();

// Connection Pool (bukan single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true // DATE/TIME/TIMESTAMP dikembalikan sebagai teks (hindari geseran zona waktu)
});

// Interface Promise agar bisa memakai async/await
module.exports = pool.promise();
