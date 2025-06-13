// whatsappController.js
const conn = require('../db/connection');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

exports.webhookHandler = async (req, res) => {
  const twiml = new MessagingResponse();
  const incomingMsg = req.body.Body?.toLowerCase();

  if (incomingMsg.includes('beneficio')) {
    conn.query('SELECT * FROM beneficios WHERE estado = "vigente"', (err, results) => {
      if (err) {
        twiml.message('Lo siento, hubo un error al consultar los beneficios.');
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        return res.end(twiml.toString());
      }

      if (results.length === 0) {
        twiml.message('No hay beneficios vigentes en este momento.');
      } else {
        let respuesta = '📋 Beneficios vigentes:\n\n';
        results.forEach((b, i) => {
          respuesta += `${i + 1}. ${b.nombre} - ${b.descripcion}\n`;
        });
        twiml.message(respuesta);
      }

      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    });
  } else {
    twiml.message('Escribe "beneficio" para ver la información disponible.');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
};
