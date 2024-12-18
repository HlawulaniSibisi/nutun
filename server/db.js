const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',           
  password: '',   
  database: 'nutum', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise(); // Export promise-based connection for async/await
