const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Configura tu conexión a MySQL
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',         // Cambia esto si tienes contraseña
  database: 'senabot' // Cambia por el nombre real de tu base
});

conn.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL');
});

// Ruta del archivo CSV
const rutaCSV = path.join(__dirname, 'beneficios.csv');

// Leer e insertar cada fila del CSV
fs.createReadStream(rutaCSV)
  .pipe(csv())
  .on('data', (data) => {
    // Ajusta los campos según la estructura real de tu tabla
    conn.query('INSERT INTO beneficios SET ?', data, (err, res) => {
      if (err) console.error('⚠️ Error al insertar fila:', err.message);
    });
  })
  .on('end', () => {
    console.log('✅ Carga finalizada');
    conn.end();
  });

