require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
  const msg = req.body.Body.toLowerCase();
  let response = '👋 Hola, soy TomiBot. Escribe un número:\n1️⃣ Beneficios\n2️⃣ Fraudes\n3️⃣ Guía digital';

  if (msg.includes('2')) {
    response = '⚠️ Cuidado con los fraudes. Ejemplo: \"Tu nieto está detenido y necesita dinero urgente\". ¿Deseas ver más ejemplos?';
  } else if (msg.includes('3')) {
    response = '📱 ¿Qué dispositivo quieres aprender a usar?\n1. Android\n2. iPhone\n3. Notebook';
  }

  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
      <Message>${response}</Message>
    </Response>
  `);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
