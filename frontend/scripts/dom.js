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
}