const exp = require('express');
const router = exp.Router();
const usuarioController = require('../src/controller/usuario_controller');



const { passport } = require('../src/controller/usuario_controller');







router.get('/registrarse', (req, res) => {
    res.render('pages/registrarse',{
        titulo: 'Registrarse',
        nombre_apellido: '',
        correo: '',
        password: '',
    });
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});


router.post('/registrarse', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/logout', usuarioController.logoutUsuario);


// Ruta para redirigir al login de Google
// ...existing code...
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// ...existing code...

// Ruta de callback después del login
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        req.session.mensaje = "¡Inicio de sesión con Google exitoso!";
        res.redirect('/');
    }
);


function asegurarAutenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/perfil_usuario', asegurarAutenticado, (req, res) => {
    res.render('pages/usuarios/perfil_usuario', {
        dato: req.user
    });
});




module.exports = router;