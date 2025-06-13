const conn = require('../db/connection');

exports.obtenerBeneficios = (req, res) => {
  conn.query('SELECT * FROM beneficios', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.obtenerBeneficiosVigentes = (req, res) => {
  if (req.query.limit) {
    conn.query('SELECT * FROM beneficios WHERE estado = "vigente" LIMIT ?', [req.query.limit], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  }
};

exports.obtenerBeneficioPorId = (req, res) => {
  const id = req.params.id;
  console.log("Buscando beneficio con ID:", id); // <-- Agrega esto
  conn.query('SELECT * FROM beneficios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Beneficio no encontrado' });
    res.json(result[0]);
  });
};

exports.crearBeneficio = (req, res) => {
  const beneficio = req.body;
  conn.query('INSERT INTO beneficios SET ?', beneficio, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...beneficio });
  });
};