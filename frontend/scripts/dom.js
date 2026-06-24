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