const exp = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios_router');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = exp();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Configurar carpeta de vistas
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ESTE MIDDLEWARE DEBE IR AQUÍ, ANTES DE LAS RUTAS
app.use((req, res, next) => {
    res.locals.usuario = req.user || null;
    res.locals.request = req; // Si quieres seguir usando request en las vistas
    next();
});

app.use(expressEjsLayouts);
app.set('layout', 'pages/bases/base'); // Configurar layout base
app.use('/css', exp.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', exp.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/static', exp.static(__dirname + '/public'));
app.use('/', productosRoutes);
app.use('/', usuariosRoutes);

app.get('/', (req, res) => {
    try {
        res.render('pages/index', {
            titulo: 'Inicio',
        });
    } catch (error) {
        console.error('Error al renderizar la vista:', error);
        res.status(500).send('Error interno del servidor');
    }
});




app.listen(process.env.PORT, () => {
    console.log(`Servidor en línea, puerto ${process.env.PORT}`);
});