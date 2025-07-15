const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CATEGORIAS = ['Moda', 'Tecnologia', 'Artesania', 'Accesorios', 'Servicios', 'Otros'];
const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: 1,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        minlength: 1,
        maxlength: 254
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo.']
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El vendedor es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: CATEGORIAS,
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    imagen: {
        type: String, 
        required: false 
    }
});


const Producto = mongoose.model('Producto', productoSchema);

module.exports = { Producto, CATEGORIAS };