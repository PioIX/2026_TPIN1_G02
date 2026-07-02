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
    document.getElementById('formLogin').classList.remove('activo');
    document.getElementById('formRegistro').classList.remove('activo');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('activo'));

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
    document.getElementById('imagenDerecha').src            = item.imagen_url;
    document.getElementById('nombreDerecha').textContent    = item.nombre;
    document.getElementById('categoriaDerecha').textContent = item.comparacion;
    document.getElementById('valorDerecha').textContent     = '???';
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
    document.getElementById('textoResultado').className   = acerto ? 'resultado-ok' : 'resultado-error';
    document.getElementById('overlayResultado').style.display = 'flex';
}
 
// Ocultar el cartel de resultado
function ocultarResultado() {
    document.getElementById('overlayResultado').style.display = 'none';
}