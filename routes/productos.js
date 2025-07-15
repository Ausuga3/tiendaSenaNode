const express = require('express');
const router = express.Router();
const productoController = require('../src/controller/producto_controller');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 
const { Producto } = require('../src/models/producto_models');
const mongoose = require('mongoose');


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
    res.render('pages/productos/form_producto', { categorias: CATEGORIAS, producto: null });
});

router.get('/productos-usuario',  productoController.listarProductosUsuario);


router.get('/actualizar_producto/:id', asegurarAutenticado, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID de producto no válido');
    }
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    res.render('pages/productos/form_producto', { categorias: CATEGORIAS, producto });
});



router.post('/actualizar_producto/:id', asegurarAutenticado, upload.single('imagenProducto'), async (req, res) => {
    try {
        // Validar el ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('ID de producto no válido');
        }

        // Preparar los campos a actualizar
        const updateFields = {
            nombre: req.body.nombreProducto,
            descripcion: req.body.descripcionProducto,
            precio: req.body.precioProducto,
            stock: req.body.stock,
            categoria: req.body.categoria,
        };

        // Si hay nueva imagen, actualizar la ruta
        if (req.file) {
            updateFields.imagen = '/static/uploads/' + req.file.filename;
        }

        // Elimina campos undefined
        Object.keys(updateFields).forEach(
            key => updateFields[key] === undefined && delete updateFields[key]
        );

        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).send('Producto no encontrado');
        }

        res.redirect('/listar_producto_usuario');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar producto');
    }
});

module.exports = router;