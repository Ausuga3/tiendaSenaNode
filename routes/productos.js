const express = require('express');
const router = express.Router();
const productoController = require('../src/controller/producto_controller');

router.get('/productos-usuario',  productoController.listarProductosUsuario);

module.exports = router;