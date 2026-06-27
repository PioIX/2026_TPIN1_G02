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
            SELECT Items.*, Categorias.nombre AS nombre_categoria, Categorias.comparacion
            FROM Items
            INNER JOIN Categorias ON Items.id_categoria = Categorias.id_categoria
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

// TAREA 7: Ranking y panel admin // 
// GET /Ranking
// Devuelve los 10 mejores puntajes, uno por jugador (el máximo)
app.get('/Ranking', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`
            SELECT Jugadores.usuario, MAX(Puntajes.puntaje) AS mejor_puntaje
            FROM Puntajes
            INNER JOIN Jugadores ON Puntajes.id_jugador = Jugadores.id_jugador
            GROUP BY Jugadores.id_jugador, Jugadores.usuario
            ORDER BY mejor_puntaje DESC
            LIMIT 10
        `)
        res.send(respuesta)
    } catch (error) {
        res.send({ error: error.message })
    }
})

// GET /Jugadores — trae todos los jugadores (para panel admin)
app.get('/Jugadores', async function(req, res) {
    try {
        let respuesta = await realizarQuery('SELECT * FROM Jugadores')
        res.send(respuesta)
    } catch (error) {
        res.send({ error: error.message })
    }
})

// GET /Categorias — trae todas las categorías (para el select del admin)
app.get('/Categorias', async function(req, res) {
    try {
        let respuesta = await realizarQuery('SELECT * FROM Categorias')
        res.send(respuesta)
    } catch (error) {
        res.send({ error: error.message })
    }
})

// POST /Items — agrega un ítem nuevo
app.post('/Items', async function(req, res) {
    try {
        await realizarQuery(`
            INSERT INTO Items (nombre, imagen_url, valor, id_categoria)
            VALUES (
                '${req.body.nombre}',
                '${req.body.imagen_url}',
                ${req.body.valor},
                ${req.body.id_categoria}
            )
        `)
        res.send('Item agregado')
    } catch (error) {
        res.send({ error: error.message })
    }
})

// PUT /Items — modifica un ítem existente
app.put('/Items', async function(req, res) {
    try {
        await realizarQuery(`
            UPDATE Items
            SET
                nombre = '${req.body.nombre}',
                imagen_url = '${req.body.imagen_url}',
                valor = ${req.body.valor},
                id_categoria = ${req.body.id_categoria}
            WHERE id_item = ${req.body.id_item}
        `)
        res.send('Item modificado')
    } catch (error) {
        res.send({ error: error.message })
    }
})

// DELETE /Items — elimina un ítem
app.delete('/Items', async function(req, res) {
    try {
        await realizarQuery(`
            DELETE FROM Items WHERE id_item = ${req.body.id_item}
        `)
        res.send('Item eliminado')
    } catch (error) {
        res.send({ error: error.message })
    }
})

// DELETE /Jugadores — elimina un jugador y sus puntajes
app.delete('/Jugadores', async function(req, res) {
    try {
        // Primero se borran los puntajes para no romper la FK
        await realizarQuery(`
            DELETE FROM Puntajes WHERE id_jugador = ${req.body.id_jugador}
        `)
        await realizarQuery(`
            DELETE FROM Jugadores WHERE id_jugador = ${req.body.id_jugador}
        `)
        res.send('Jugador eliminado')
    } catch (error) {
        res.send({ error: error.message })
    }
})

// DELETE /Puntajes — borra todos los puntajes de un jugador
app.delete('/Puntajes', async function(req, res) {
    try {
        await realizarQuery(`
            DELETE FROM Puntajes WHERE id_jugador = ${req.body.id_jugador}
        `)
        res.send('Puntajes eliminados')
    } catch (error) {
        res.send({ error: error.message })
    }
})