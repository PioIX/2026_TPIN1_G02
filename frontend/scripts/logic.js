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
    let usuario = getLoginUsuario();
    let contrasena = getLoginContrasena();

    if (!usuario || !contrasena) {
        mostrarMensajeLogin('Ingresá tu usuario y contraseña.');
        return;
    }

    let datos = {usuario, contrasena}

    const response = await fetch(`${BASE_URL}/Login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    })

    let result = await response.json()

    if (result.error) {
        mostrarMensajeLogin(result.error + ' — ¿Querés registrarte?');
        return;
    }

    sessionStorage.setItem('jugador', JSON.stringify(result));
    window.location.href = result.es_admin ? 'admin.html' : 'menu.html';
}

async function registro() {
    let nombre = getRegNombre();
    let usuario = getRegUsuario();
    let contrasena = getRegContrasena();

    if (!nombre || !usuario || !contrasena) {
        mostrarMensajeRegistro('Completá todos los campos antes de registrarte.');
        return;
    }

    let datos = {nombre, usuario, contrasena}

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

// TAREA 10: Ranking (ranking.html)
// Pide el top 10 al servidor y lo muestra en la tabla
async function cargarRanking() {
    let filas = await pedirAlServidor('/Ranking');
    let jugador = JSON.parse(sessionStorage.getItem('jugador'));
    let usuarioActual = jugador ? jugador.usuario : null;
    mostrarTablaRanking(filas, usuarioActual);
}

// TAREA 7 + 11: Panel Admin (admin.html)
let itemsGuardados = []; // copia local para poder editar sin ir al servidor
let categoriasGuardadas = [];

// Carga todos los datos al abrir el panel admin
async function cargarDatosAdmin() {
    await cargarItems();
    await cargarJugadores();
    await cargarCategorias();
}

async function cargarItems() {
    itemsGuardados = await pedirAlServidor('/Items');
    mostrarTablaItems(itemsGuardados);
}

async function cargarJugadores() {
    let jugadores = await pedirAlServidor('/Jugadores');
    mostrarTablaJugadores(jugadores);
}

async function cargarCategorias() {
    categoriasGuardadas = await pedirAlServidor('/Categorias');
    llenarSelectCategorias(categoriasGuardadas, 'agregarCategoria');
    llenarSelectCategorias(categoriasGuardadas, 'editCategoria');
}

// Agrega un ítem nuevo con los datos del formulario
async function agregarItem() {
    let datos = {
        nombre: document.getElementById('agregarNombre').value,
        imagen_url: document.getElementById('agregarImagen').value,
        valor: document.getElementById('agregarValor').value,
        id_categoria: document.getElementById('agregarCategoria').value
    }
    await pedirAlServidor('/Items', 'POST', datos);
    mostrarMensajeAdmin('Item agregado correctamente');
    await cargarItems();
}

// Busca el ítem en la copia local y abre el formulario de edición con sus datos
function prepararEdicion(id_item) {
    let item = itemsGuardados.find(i => i.id_item === id_item);
    if (item) {
        cargarDatosEdicion(item);
    }
}

// Guarda los cambios del formulario de edición
async function editarItem() {
    let datos = {
        id_item: document.getElementById('editId').value,
        nombre: document.getElementById('editNombre').value,
        imagen_url: document.getElementById('editImagen').value,
        valor: document.getElementById('editValor').value,
        id_categoria: document.getElementById('editCategoria').value
    }
    await pedirAlServidor('/Items', 'PUT', datos);
    mostrarFormEdicion(false);
    mostrarMensajeAdmin('Item modificado correctamente');
    await cargarItems();
}

async function eliminarItem(id_item) {
    await pedirAlServidor('/Items', 'DELETE', { id_item });
    mostrarMensajeAdmin('Item eliminado');
    await cargarItems();
}

async function eliminarPuntajes(id_jugador) {
    await pedirAlServidor('/Puntajes', 'DELETE', { id_jugador });
    mostrarMensajeAdmin('Puntajes eliminados');
}

async function eliminarJugador(id_jugador) {
    await pedirAlServidor('/Jugadores', 'DELETE', { id_jugador });
    mostrarMensajeAdmin('Jugador eliminado');
    await cargarJugadores();
}