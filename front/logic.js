let uno;
let dos;
let puntos = 0;
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function recibir_id() {
    let res = await fetch("http://localhost:4000/cantantes")
    let respuesta = await res.json()

    console.log(respuesta)
    objeto = aleatorio(1, 28)
    objetos = respuesta
    console.log(objetos)
    for (let i = 0; i < respuesta.length; i++) {
        const obj = respuesta[i];
        if(obj.id_item == objeto){
            item = i
        }
        
    }
    objeto2 = aleatorio(1, 28)
    for (let i = 0; i < respuesta.length; i++) {
        const obj = respuesta[i];
        if(obj.id_item == objeto){
            item = i
        }
    }

    while(respuesta[objeto].id_item === respuesta[objeto2].id_item){
        objeto2 = aleatorio(1, 28)
        for (let i = 0; i < respuesta.length; i++) {
            const obj = respuesta[i];
            if(obj.id_item == objeto2){
                item = i
            }
        }
    }
    uno = respuesta[objeto]
    dos = respuesta[objeto2]
    mostrar(respuesta, objeto, objeto2)

}

function mostrar(respuesta, objeto, objeto2){
    if(respuesta[objeto].id_categoria === respuesta[objeto2].id_categoria){
        document.getElementById("img_1").src = respuesta[objeto].imagen_url
        document.getElementById("img_1").alt = respuesta[objeto].nombre
        document.getElementById("img_2").src = respuesta[objeto2].imagen_url
        document.getElementById("img_2").alt = respuesta[objeto2].nombre
        document.getElementById("valor1").innerHTML=`<p>${respuesta[objeto].valor}</p>`
        }else{
            recibir_id()
        }
}

function mayor(uno,dos){
    console.log(uno)
    console.log(dos)
    if(uno.valor > dos.valor){
        puntos++
    }else{
        let datos = {
            puntaje: puntos,
            fecha: Date,
            id_jugador: null
        }
        guardarPuntaje(datos)
    }
}

function menor(){
    if(uno.valor < dos.valor){
        puntos++
    }else{
        let datos = {
            puntaje: puntos,
            fecha: Date,
            id_jugador: null
        }
        guardarPuntaje(datos)
    }
}

async function guardarPuntaje(datos) {
    const response = await fetch('http://localhost:4000/artistasPost',{
        method: "POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })
    console.log(response)
    let result = await response.json()//Desarma el json y lo arma como un objeto
    console.log(result)

}


