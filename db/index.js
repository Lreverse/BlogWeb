const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '0011223',
    database: 'my_db_02',
})

module.exports = db