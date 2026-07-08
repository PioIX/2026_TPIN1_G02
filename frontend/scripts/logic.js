const BASE_URL = 'http://localhost:4000';

async function pedirAlServidor(ruta, metodo = 'GET', datos = null) {
    let opciones = {
        method:  metodo,
        headers: { 'Content-Type': 'application/json' }
    }
    if (datos) opciones.body = JSON.stringify(datos);
 
    let response = await fetch(BASE_URL + ruta, opciones);
 
    // Si el servidor devuelve texto plano (ej: "Registro exitoso") usamos .text()
    // Si devuelve un objeto o array usamos .json()
    let contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }
    return await response.text();
}

// TAREA 5: Login y Registro
async function login() {
    let datos = {
        usuario: getLoginUsuario(),
        contrasena: getLoginContrasena()
    }

    const response = await fetch(`${BASE_URL}/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    let result = await response.json()

    if (result.error) {
        mostrarMensajeLogin(result.error + ' — ¿Querés registrarte?');
        return;
    }

    sessionStorage.setItem('jugador', JSON.stringify(result));

    if (result.es_admin) {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'menu.html';
    }
}

async function registro() {
    let datos = {
        nombre: getRegNombre(),
        usuario: getRegUsuario(),
        contrasena: getRegContrasena()
    }

    const response = await fetch(`${BASE_URL}/Registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    let result = await response.text()

    if (result.includes('error') || result.includes('Error')) {
        mostrarMensajeRegistro('El usuario ya existe. Intentá con otro nombre de usuario.');
    } else {
        mostrarMensajeRegistro('¡Cuenta creada! Ya podés iniciar sesión.', false);
        mostrarTab('login');
    }
}

// TAREA 6 + 9: Juego (juego.html)
 
let juego; 
 
// Al hacer click en ARTISTAS o PELÍCULAS:
// oculta el selector y muestra la pantalla del juego
function elegirCategoria(id_categoria) {
    document.getElementById('selectorCategoria').style.display = 'none';
    document.getElementById('arenaJuego').style.display = 'flex';
    iniciarJuego(id_categoria);
}
 
// Pide los ítems al servidor, filtra por categoría y arranca el juego
async function iniciarJuego(id_categoria) {
    let data = await pedirAlServidor('/Items');
 
    if (!Array.isArray(data)) {
        alert('No se pudieron cargar los ítems. Revisá que el servidor esté corriendo y que las tablas estén creadas con db.sql');
        return;
    }
 
    // Se queda solo con los ítems de la categoría que eligió el jugador
    let items = data
        .filter(d => d.id_categoria === id_categoria)
        .map(d => new Item(d.id_item, d.nombre, d.imagen_url, parseFloat(d.valor), d.id_categoria, d.nombre_categoria, d.comparacion));
 
    if (items.length < 2) {
        alert('No hay suficientes ítems en esa categoría. Cargá más desde el panel admin.');
        return;
    }
 
    juego = new Juego(items);
    juego.iniciar();
 
    mostrarItemIzquierda(juego.itemActual);
    mostrarItemDerecha(juego.itemSiguiente);
    actualizarPuntaje(juego.puntaje);
}
 
// Se llama al apretar HIGHER o LOWER
async function responder(respuesta) {
    if (!juego || juego.terminado) return;
 
    revelarValorDerecha(juego.itemSiguiente);
 
    let acerto = juego.responder(respuesta);
    mostrarResultado(acerto);
 
    if (acerto) {
        actualizarPuntaje(juego.puntaje);
        // Espera 1.2 segundos, oculta el resultado y muestra el siguiente par
        setTimeout(() => {
            ocultarResultado();
            mostrarItemIzquierda(juego.itemActual);
            mostrarItemDerecha(juego.itemSiguiente);
        }, 1200);
    } else {
        // Espera 1.8 segundos, guarda el puntaje y va al ranking
        setTimeout(async () => {
            await pedirAlServidor('/Puntajes', 'POST', {
                puntaje: juego.puntaje,
                id_jugador: JSON.parse(sessionStorage.getItem('jugador')).id_jugador
            });
            sessionStorage.setItem('ultimoPuntaje', juego.puntaje);
            window.location.href = 'ranking.html';
        }, 1800);
    }
}

// Envía el puntaje final al servidor para guardarlo en la base de datos.
async function guardarPuntaje(puntaje) {
    let jugador = JSON.parse(sessionStorage.getItem('jugador'));

    await fetch(`${BASE_URL}/Puntajes`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ puntaje: puntaje, id_jugador: jugador.id_jugador })
    })
}