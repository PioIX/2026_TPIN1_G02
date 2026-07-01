const BASE_URL = 'http://localhost:4000';

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


