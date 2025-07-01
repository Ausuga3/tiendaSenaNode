const express = require('express');
const router = express.Router();
const productoController = require('../src/controller/producto_controller');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 


const { CATEGORIAS } = require('../src/models/producto_models');
function asegurarAutenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/listar_producto_usuario', require('../src/controller/producto_controller').listarProductosUsuario);


router.post('/agregar-producto', asegurarAutenticado, upload.single('imagenProducto'), async (req, res) => {
    const productoController = require('../src/controller/producto_controller');
    await productoController.agregarProducto(req, res);
});

router.get('/agregar_producto', asegurarAutenticado, (req, res) => {
    res.render('pages/productos/agregar_producto', { categorias: CATEGORIAS });
});

router.get('/productos-usuario',  productoController.listarProductosUsuario);





module.exports = router;