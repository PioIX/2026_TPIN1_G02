var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');


var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000


// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
});

app.get('/cantantes', async function(req,res){
    	try {
        let respuesta;
        respuesta = await realizarQuery(`SELECT * FROM Items`)
        res.send(respuesta);
    } catch (e) {
        res.send("Tuviste un error");
    }
})

app.get('/puntaje', async function name(req,res){
    try {
        let respuesta;
        respuesta = await realizarQuery(`SELECT * FROM Puntajes`)
        res.send(respuesta)
    } catch (e) {
        res.send("Tuviste un error")
    }
    
})

app.get('/jugador', async function name(req,res){
    try {
        let respuesta;
        respuesta = await realizarQuery(`SELECT * FROM Jugadores`)
        res.send(respuesta)
    } catch (e) {
        res.send("Tuviste un error")
    }
    
})

app.get('/categoria', async function name(req,res){
    try {
        let respuesta;
        respuesta = await realizarQuery(`SELECT * FROM Categorias`)
        res.send(respuesta)
    } catch (e) {
        res.send("Tuviste un error")
    }
    
})