const mongo = require("../config/connection");

const pedidoSchema = new mongo.Schema({
    productoId: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { _id: false });


const modeloUsuario = mongo.model("usuario", schemaUsuario);

module.exports = modeloUsuario;