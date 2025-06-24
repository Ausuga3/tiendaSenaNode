const Usuario = require("../models/usuario_models");
const bcrypt = require("bcrypt"); // encrptar contraseñas
const jwt = require("jsonwebtoken"); // generar token de acceso
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const nodemailer = require('nodemailer'); // para enviar correos electrónicos


// Registrar un nuevo usuario
// ...existing code...
exports.registrarUsuario = async (req, res) => {
    try {
        const {nombre_apellido, correo, password} = req.body;
        // verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }
        // encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre_apellido,
            correo,
            password: hashedPassword
        });
        await nuevoUsuario.save();
        req.session.mensaje = "¡Tu registro ha sido exitoso!";
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.TU_USER_DE_GMAIL,
                pass: process.env.TU_PASSWORD_DE_GOOGLE
            }
        });

        // Enviar correo de bienvenida al usuario registrado
        const mailOptions = {
            from: 'ausuga3@gmail.com',
            to: correo, // correo del usuario registrado
            subject: 'Bienvenida',
            text: `¡Bienvenido/a ${nombre_apellido} a nuestra aplicación!`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Error al enviar correo:', error);
            } else {
                console.log('Correo de bienvenida enviado:', info.response);
            }
        });

        return res.redirect('/login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
}
// ...existing code...



exports.loginUsuario = async (req, res) => {
    try {
        const { correo, password} = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }
        // verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
        // Guardar usuario en la sesión y en req.user
        req.session.mensaje = "¡Inicio de sesión exitoso!";
        req.user = usuario; // Para que el middleware lo detecte inmediatamente
        req.login(usuario, function(err) { // Esto es importante para Passport
            if (err) {
                console.error("Error en req.login:", err);
                return res.status(500).json({ mensaje: "Error al iniciar sesión" });
            }
            return res.redirect('/');
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};
// Serializar el usuario (guardar solo su ID en la sesión)
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// Deserializar el usuario (buscarlo por su ID)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

exports.logoutUsuario = (req, res) => {
    req.logout(function(err) { // Método de Passport para cerrar sesión
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ mensaje: "Error al cerrar sesión" });
        }
        req.session.destroy(() => { // Elimina la sesión del usuario
            res.clearCookie('connect.sid'); // Limpia la cookie de sesión
            res.redirect('/login'); // Redirige al login
        });
    });
};


// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,           // ID de cliente desde Google Developer Console
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,   // Secreto de cliente
    callbackURL: "/auth/google/callback", // URL a la que redirige Google después de iniciar sesión
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Buscar usuario por correo
        const email = profile.emails[0].value;
        let user = await Usuario.findOne({ correo: email });

        // Si no existe, lo crea
        if (!user) {
            user = await Usuario.create({
                nombre_apellido: profile.displayName,
                correo: email,
                password: 'google_oauth'  // contraseña temporal
            });
        }

        // Finaliza la autenticación
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));



exports.passport = passport;