require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', async(req, res) => {
  const msg = req.body.Body.toLowerCase();
  let response = '👋 Hola, soy TomiBot. Escribe un número:\n1️⃣ Beneficios\n2️⃣ Fraudes\n3️⃣ Guía digital';

  if (msg.includes('1') || msg.includes('beneficios')) {
    const respuesta = await obtenerBeneficiosVigentes();
    twiml.message(respuesta);
  } else if (msg.includes('2')) {
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

async function obtenerBeneficiosVigentes() {
  try {
    const res = await axios.get('http://localhost:3001/api/beneficios');
    return res.data.map(b => `✅ ${b.nombre}: ${b.descripcion}`).join('\n\n');
  } catch (err) {
    return '❌ No se pudieron obtener los beneficios actualizados.';
  }
}

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
