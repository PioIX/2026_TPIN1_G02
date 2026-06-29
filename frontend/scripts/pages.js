// ── JUEGO (juego.html) ────────────────────────────────────

function iniciarPaginaJuego() {
    let jugador = JSON.parse(sessionStorage.getItem('jugador'));
    if (!jugador) window.location.href = 'index.html';
}

// ── ADMIN (admin.html) ────────────────────────────────────

function iniciarPaginaAdmin() {
    let jugador = JSON.parse(sessionStorage.getItem('jugador'));
    if (!jugador || !jugador.es_admin) window.location.href = 'index.html';
    cargarDatosAdmin();
}

function cambiarTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('activo'));
    document.querySelectorAll('.admin-seccion').forEach(s => s.classList.remove('activa'));

    if (tab === 'items') {
        document.querySelectorAll('.admin-tab')[0].classList.add('activo');
        document.getElementById('seccionItems').classList.add('activa');
    } else {
        document.querySelectorAll('.admin-tab')[1].classList.add('activo');
        document.getElementById('seccionJugadores').classList.add('activa');
    }
}
