const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'senabot'
});

conn.connect(err => {
  if (err) throw err;
  console.log('🟢 Conexión a MySQL establecida');
});

module.exports = conn;
