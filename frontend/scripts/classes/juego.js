class Juego {
    constructor(items) {
        this.items        = items;       // array de objetos Item
        this.puntaje      = 0;
        this.itemActual   = null;        // el ítem de la izquierda (referencia)
        this.itemSiguiente = null;       // el ítem de la derecha (a adivinar)
        this.terminado    = false;
    }
    elegirItemAleatorio(excluirId = null) {
        let candidatos = this.items.filter(item => item.id_item !== excluirId);
        let indice     = Math.floor(Math.random() * candidatos.length);
        return candidatos[indice];
    }
    iniciar() {
        this.itemActual    = this.elegirItemAleatorio();
        this.itemSiguiente = this.elegirItemAleatoriaMismaCategoria(this.itemActual);
        this.puntaje       = 0;
        this.terminado     = false;
    }
    elegirItemAleatoriaMismaCategoria(referencia) {
        let candidatos = this.items.filter(
            item => item.id_categoria === referencia.id_categoria
                 && item.id_item     !== referencia.id_item
        );
        // Si no hay candidatos de la misma categoría, elige cualquiera
        if (candidatos.length === 0) {
            candidatos = this.items.filter(item => item.id_item !== referencia.id_item);
        }
        let indice = Math.floor(Math.random() * candidatos.length);
        return candidatos[indice];
    }
    responder(respuesta) {
        let acerto;
        if (respuesta === 'higher') {
            acerto = this.itemSiguiente.valor >= this.itemActual.valor;
        } else {
            acerto = this.itemSiguiente.valor <= this.itemActual.valor;
        }

        if (acerto) {
            this.puntaje++;
            // El ítem siguiente pasa a ser el nuevo ítem actual
            this.itemActual    = this.itemSiguiente;
            this.itemSiguiente = this.elegirItemAleatoriaMismaCategoria(this.itemActual);
        } else {
            this.terminado = true;
        }

        return acerto;
    }
}