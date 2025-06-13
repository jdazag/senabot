const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Archivos de Rutas
const beneficiosRoutes = require('./routes/beneficiosRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes'); // opcional
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use('/api/beneficios', beneficiosRoutes);
app.use('/whatsapp', whatsappRoutes);

module.exports = app;
