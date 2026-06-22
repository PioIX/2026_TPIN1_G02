var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app  = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function() {
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res) {
    res.status(200).send({ message: 'GET Home route working fine!' });
});


// TAREA 5: Login y Registro

// POST /Registro
// Recibe: nombre, usuario, contrasena
// Valida que no exista el usuario, luego lo inserta
app.post('/Registro', async function(req, res) {
    try {
        let usuarioExistente = await realizarQuery(`
            SELECT * FROM Jugadores
            WHERE usuario = '${req.body.usuario}'
        `)

        if (usuarioExistente.length > 0) {
            throw new Error('El usuario ya existe')
        }

        await realizarQuery(`
            INSERT INTO Jugadores (nombre, usuario, contrasena, es_admin, fecha_registro)
            VALUES (
                '${req.body.nombre}',
                '${req.body.usuario}',
                '${req.body.contrasena}',
                0,
                NOW()
            )
        `)

        res.send('Registro exitoso')

    } catch (error) {
        res.send({ error: error.message })
    }
})

// POST /Login
// Recibe: usuario, contrasena
// Devuelve el objeto jugador si las credenciales son correctas
// El front usa es_admin para saber a dónde redirigir
app.post('/Login', async function(req, res) {
    try {
        let resultado = await realizarQuery(`
            SELECT * FROM Jugadores
            WHERE usuario    = '${req.body.usuario}'
            AND   contrasena = '${req.body.contrasena}'
        `)

        if (resultado.length === 0) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        res.send(resultado[0])

    } catch (error) {
        res.send({ error: error.message })
    }
})


// TAREA 6: Lógica del juego
// GET /Items
// Devuelve todos los ítems con nombre de categoría y texto de comparación
app.get('/Items', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`
            SELECT Items.*, Categoria.nombre AS nombre_categoria, Categoria.comparacion
            FROM Items
            JOIN Categoria ON Items.id_categoria = Categoria.id_categoria
        `)
        res.send(respuesta)
    } catch (error) {
        res.send({ error: error.message })
    }
})

// POST /Puntajes
// Recibe: id_jugador, puntaje
// Guarda el puntaje al terminar la partida
app.post('/Puntajes', async function(req, res) {
    try {
        await realizarQuery(`
            INSERT INTO Puntajes (puntaje, fecha, id_jugador)
            VALUES (${req.body.puntaje}, NOW(), ${req.body.id_jugador})
        `)
        res.send('Puntaje guardado')
    } catch (error) {
        res.send({ error: error.message })
    }
})

