const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'senabot'
});

app.get('/api/beneficios', (req, res) => {
  conn.query('SELECT * FROM beneficios WHERE estado = "vigente"', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/beneficios', (req, res) => {
  const beneficio = req.body;
  conn.query('INSERT INTO beneficios SET ?', beneficio, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...beneficio });
  });
});

app.listen(3001, () => console.log('API de beneficios corriendo en puerto 3001'));
