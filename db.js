const mysql = require('mysql2')

// working with MySQL as I have not worked with MongoDB, so I don't know how to set it up.

// create connection pool
// - pool is a collection of mysql connections managed by MySQL

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'D1_87065_Anupam',
  password: 'manager',
  database: 'Todo_db',
})

// export the pool
module.exports = {
  pool,
}
