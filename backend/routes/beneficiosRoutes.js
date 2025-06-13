const express = require('express');
const router = express.Router();
const beneficiosController = require('../controllers/beneficiosController');

router.get('/', beneficiosController.obtenerBeneficios);
router.get('/vigentes', beneficiosController.obtenerBeneficiosVigentes);
// backend/routes/beneficiosRoutes.js
router.get('/editar/:id', beneficiosController.obtenerBeneficioPorId);


module.exports = router;
