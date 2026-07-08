// Login / Registro 

function getLoginUsuario()    { return document.getElementById('loginUsuario').value }
function getLoginContrasena() { return document.getElementById('loginContrasena').value }
function getRegNombre()     { return document.getElementById('regNombre').value }
function getRegUsuario()    { return document.getElementById('regUsuario').value }
function getRegContrasena() { return document.getElementById('regContrasena').value }

function mostrarMensajeLogin(texto, esError = true) {
    let el = document.getElementById('mensajeLogin');
    el.textContent = texto;
    el.className   = esError ? 'mensaje' : 'mensaje ok';
}

function mostrarMensajeRegistro(texto, esError = true) {
    let el = document.getElementById('mensajeRegistro');
    el.textContent = texto;
    el.className   = esError ? 'mensaje' : 'mensaje ok';
}

// Cambia entre los tabs de login y registro
function mostrarTab(tab) {
    let esLogin = tab === 'login';

    document.getElementById('formLogin').classList.toggle('activo', esLogin);
    document.getElementById('formRegistro').classList.toggle('activo', !esLogin);
    document.querySelectorAll('.tab')[0].classList.toggle('activo', esLogin);
    document.querySelectorAll('.tab')[1].classList.toggle('activo', !esLogin);
    if (tab === 'login') {
        document.getElementById('formLogin').classList.add('activo');
        document.querySelectorAll('.tab')[0].classList.add('activo');
    } else {
        document.getElementById('formRegistro').classList.add('activo');
        document.querySelectorAll('.tab')[1].classList.add('activo');
    }
}

// JUEGO (juego.html) 

// Mostrar el ítem de la izquierda (el de referencia, con valor visible)
function mostrarItemIzquierda(item) {
    document.getElementById('imagenIzquierda').src            = item.imagen_url;
    document.getElementById('nombreIzquierda').textContent    = item.nombre;
    document.getElementById('categoriaIzquierda').textContent = item.comparacion;
    document.getElementById('valorIzquierda').textContent     = item.valorFormateado();
}

// Mostrar el ítem de la derecha (el que hay que adivinar, valor oculto)
function mostrarItemDerecha(item) {
    document.getElementById('imagenDerecha').src = item.imagen_url;
    document.getElementById('nombreDerecha').textContent = item.nombre;
    document.getElementById('categoriaDerecha').textContent = item.comparacion;
    document.getElementById('valorDerecha').textContent = '???';
}

// Mostrar el valor real del ítem de la derecha (cuando el jugador ya respondió)
function revelarValorDerecha(item) {
    document.getElementById('valorDerecha').textContent = item.valorFormateado();
}

// Actualizar el número de puntaje que aparece arriba
function actualizarPuntaje(puntaje) {
    document.getElementById('puntajeActual').textContent = puntaje;
}

// Mostrar el cartel de CORRECTO o INCORRECTO encima de todo
function mostrarResultado(acerto) {
    document.getElementById('textoResultado').textContent = acerto ? '✓ CORRECTO' : '✗ INCORRECTO';
    document.getElementById('textoResultado').className = acerto ? 'resultado-ok' : 'resultado-error';
    document.getElementById('overlayResultado').style.display = 'flex';
}
 
// Ocultar el cartel de resultado
function ocultarResultado() {
    document.getElementById('overlayResultado').style.display = 'none';
}
// Ranking 
// Llena la tabla de ranking con el array de filas recibido del backend
// Resalta la fila del jugador logueado
function renderizarTablaRanking(filas, usuarioActual) {
    let tabla = document.getElementById('tablaRanking');
    tabla.innerHTML = '';

    filas.forEach((fila, index) => {
        let posicion = index + 1;
        let esTop = posicion <= 3;
        let esMiFila  = fila.usuario === usuarioActual;

        tabla.innerHTML += `
            <tr class="${esMiFila ? 'mi-fila' : ''}">
                <td class="posicion ${esTop ? 'top' : ''}">${posicion}</td>
                <td>${fila.usuario}</td>
                <td class="puntaje-col">${fila.mejor_puntaje}</td>
            </tr>
        `;
    });
}

// Muestra la sección de fin de partida con el puntaje
function mostrarFinPartida(puntaje) {
    document.getElementById('finPartida').style.display = 'block';
    document.getElementById('puntajeFinal').innerHTML = `
        ${puntaje}
        <span>aciertos consecutivos</span>
    `;
}


//  Admin 
// Llena la tabla de ítems en el panel admin
function renderizarTablaItems(items) {
    let tabla = document.getElementById('tablaItems');
    tabla.innerHTML = '';
    items.forEach(item => {
        tabla.innerHTML += `
            <tr>
                <td>${item.id_item}</td>
                <td>${item.nombre}</td>
                <td>${item.nombre_categoria}</td>
                <td>${Number(item.valor).toLocaleString('es-AR')}</td>
                <td>
                    <button class="btn-secondary" onclick="prepararEdicion(${item.id_item})">Editar</button>
                    <button class="btn-danger" onclick="eliminarItem(${item.id_item})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Llena la tabla de jugadores en el panel admin
function renderizarTablaJugadores(jugadores) {
    let tabla = document.getElementById('tablaJugadores');
    tabla.innerHTML = '';
    jugadores.forEach(j => {
        if (j.es_admin) return; // no mostrar al admin en la lista
        tabla.innerHTML += `
            <tr>
                <td>${j.id_jugador}</td>
                <td>${j.nombre}</td>
                <td>${j.usuario}</td>
                <td>
                    <button class="btn-danger" onclick="eliminarPuntajes(${j.id_jugador})">Borrar puntajes</button>
                    <button class="btn-danger" onclick="eliminarJugador(${j.id_jugador})">Eliminar jugador</button>
                </td>
            </tr>
        `;
    });
}

// Llena el select de categorías en el formulario de agregar/editar
function llenarSelectCategorias(categorias, selectId) {
    let select = document.getElementById(selectId);
    select.innerHTML = '';
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.id_categoria}">${cat.nombre}</option>`;
    });
}

// Muestra u oculta el formulario de edición
function mostrarFormEdicion(visible) {
    document.getElementById('formEdicion').style.display = visible ? 'block' : 'none';
}

// Carga los datos de un ítem en el formulario de edición
function cargarDatosEdicion(item) {
    document.getElementById('editId').value = item.id_item;
    document.getElementById('editNombre').value = item.nombre;
    document.getElementById('editImagen').value = item.imagen_url;
    document.getElementById('editValor').value = item.valor;
    document.getElementById('editCategoria').value = item.id_categoria;
    mostrarFormEdicion(true);
}

function getMensajeAdmin() { return document.getElementById('mensajeAdmin') }

function mostrarMensajeAdmin(texto, esError = false) {
    let el = getMensajeAdmin();
    el.textContent = texto;
    el.className = esError ? 'mensaje' : 'mensaje ok';
    setTimeout(() => { el.textContent = '' }, 3000);
}