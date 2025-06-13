const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Ruta ejemplo
router.post('/', whatsappController.webhookHandler);

module.exports = router;
