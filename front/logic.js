function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function recibir_imagen() {
    let res = await fetch("http://localhost:4000/cantantes")
    let respuesta = await res.json()
    let 1 = respuesta[objeto]
    let 2 = respuesta[objeto2]
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
    
    mostrar(1,2)

}

function mostrar(1,2){
    if(respuesta[objeto].id_categoria === respuesta[objeto2].id_categoria){
        document.getElementById("img_1").innerHTML= `<img src="${respuesta[objeto].imagen_url}" alt="">`
        document.getElementById("img_2").innerHTML= `<img src="${respuesta[objeto].imagen_url}" alt="">`
        }else{
            recibir_imagen()
        }
}
