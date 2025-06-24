const Producto = require('../models/producto_models');

// Crear un producto
exports.createProduct = async (req, res) => {
    try {
        const newProduct = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            stock: req.body.stock,
            vendedor: req.body.vendedor, // Debe ser un ObjectId válido
            categoria: req.body.categoria,
            color: req.body.color,
            en_oferta: req.body.en_oferta,
            precio_original: req.body.precio_original,
            descuento: req.body.descuento
        };

        const productoCreado = await Producto.create(newProduct);
        res.status(201).json({ mensaje: 'Producto creado con éxito', producto: productoCreado });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
            stock: req.body.stock,
            vendedor: req.body.vendedor,
            categoria: req.body.categoria,
            color: req.body.color,
            en_oferta: req.body.en_oferta,
            precio_original: req.body.precio_original,
            descuento: req.body.descuento
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
        const productos = await Producto.find(); // Ajusta según tu lógica
        res.render('pages/productos/listar_producto_usuario', {
            titulo: 'Tienda Sena',
            data: productos,
            request: req // Si necesitas la sesión en la vista
        });
    } catch (error) {
        res.status(500).send('Error al listar productos');
    }
};