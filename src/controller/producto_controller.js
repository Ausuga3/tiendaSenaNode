const { Producto, CATEGORIAS } = require('../models/producto_models');


// Crear un producto
exports.agregarProducto = async (req, res) => {
    try {
        const { nombreProducto, descripcionProducto, precioProducto, stock, categoria } = req.body;
        // Suponiendo que tienes el usuario en req.user
        const vendedor = req.user ? req.user._id : null;

        // Si subiste imagen, puedes guardar la ruta
        let imagen = null;
        if (req.file) {
            imagen = '/static/uploads/' + req.file.filename;
        }

        const nuevoProducto = new Producto({
            nombre: nombreProducto,
            descripcion: descripcionProducto,
            precio: precioProducto,
            stock: stock,
            vendedor: vendedor,
            categoria: categoria,
            imagen: imagen,
            
        });

        await nuevoProducto.save();
        res.redirect('/listar_producto_usuario');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar producto');
    }
};
// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.find().populate('vendedor');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('vendedor');
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const updateFields = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            vendedor: req.body.vendedor,
            categoria: req.body.categoria,
            imagen: req.body.imagen,
        };

        // Elimina campos undefined para evitar sobreescribir con undefined
        Object.keys(updateFields).forEach(
            key => updateFields[key] === undefined && delete updateFields[key]
        );

        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto actualizado', producto: productoActualizado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.listarProductosUsuario = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('pages/productos/listar_producto_usuario', {
            productos: productos,
            request: req
        });
    } catch (error) {
        res.status(500).send('Error al listar productos');
    }
};


