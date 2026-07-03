// Juego.js — Clase que maneja el estado de una partida
class Juego {
    constructor(items) {
        this.items = items;
        this.puntaje = 0;
        this.itemActual = null;  
        this.itemSiguiente = null;  
        this.terminado = false;
    }

    iniciar() {
        this.itemActual = this.itemAlAzar();
        this.itemSiguiente = this.itemAlAzarDistinto(this.itemActual);
        this.puntaje = 0;
        this.terminado = false;
    }

    itemAlAzar() {
        let indice = Math.floor(Math.random() * this.items.length);
        return this.items[indice];
    }

    itemAlAzarDistinto(itemEnPantalla) {
        let opciones = this.items.filter(item => item.id_item !== itemEnPantalla.id_item);
        let indice   = Math.floor(Math.random() * opciones.length);
        return opciones[indice];
    }

    // Recibe la respuesta del jugador ("higher" o "lower") y devuelve true si acertó
    // Si acertó: suma 1 punto y avanza al siguiente ítem
    // Si no acertó: marca la partida como terminada
    responder(respuesta) {
        let acerto;

        if (respuesta === 'higher') {
            acerto = this.itemSiguiente.valor >= this.itemActual.valor;
        } else {
            acerto = this.itemSiguiente.valor <= this.itemActual.valor;
        }

        if (acerto) {
            this.puntaje++;
            this.itemActual == this.itemSiguiente;
            this.itemSiguiente = this.itemAlAzarDistinto(this.itemActual);
        } else {
            this.terminado = true;
        }

        return acerto;
    }
}