// db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',      // MySQL server host
  user: 'root',           // MySQL username
  password: 'root',       // MySQL password
  database: 'ebs2',        // Name of the database; ensure this exists
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();
