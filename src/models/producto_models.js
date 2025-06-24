const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        enum: ['Moda', 'Tecnologia', 'Artesania', 'Accesorios', 'Servicios', 'Otros']
    },
    color: {
        type: String,
        enum: ['Ninguno', 'Gris', 'Blanco', 'Negro', 'Amarillo', 'Azul', 'Rojo'],
        default: 'Ninguno'
    },
    en_oferta: {
        type: Boolean,
        default: false
    },
    precio_original: {
        type: Number,
        required: [true, 'El precio original es obligatorio'],
        min: [0, 'El precio original no puede ser negativo.']
    },
    descuento: {
        type: Number,
        default: 0,
        min: [0, 'El descuento no puede ser negativo.']
    }
});

// Validación de descuento
productoSchema.pre('save', function(next) {
    if (this.en_oferta && this.descuento > 0) {
        this.precio_final = this.precio_original - (this.precio_original * this.descuento / 100);
    } else {
        this.precio_final = this.precio_original;
    }
    next();
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;