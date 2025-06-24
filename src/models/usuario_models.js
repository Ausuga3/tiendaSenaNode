const mongoose = require("../config/connection");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre_apellido: {
        type: String,
        required: [true, 'El nombre y apellido es obligatorio'],
        minlength: 3,
        maxlength: 150
    },
    documento: {
        type: String,
        default: "000000",
        maxlength: 20
    },
    contacto: {
        type: Number,
        default: 0
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        maxlength: 254
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 7,
        maxlength: 128
    },
    rol: {
        type: Number,
        enum: [1, 2, 3], // 1: Administrador, 2: Cliente, 3: Vendedor
        default: 2,
        required: true
    },
    imagen_perfil: {
        type: String, // URL de la imagen
        default: "public/assets/Andres.png"
    },
    direccion: {
        type: String,
        default: "none",
        maxlength: 254
    },
    certificado: {
        type: String // URL del certificado
    }
}, { versionKey: false });

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;