// TAREA 8  — Clase Item
class Item {
    constructor(id_item, nombre, imagen_url, valor, id_categoria, nombre_categoria, comparacion) {
        this.id_item          = id_item;
        this.nombre           = nombre;
        this.imagen_url       = imagen_url;
        this.valor            = valor;
        this.id_categoria     = id_categoria;
        this.nombre_categoria = nombre_categoria;
        this.comparacion      = comparacion;  
    }

    // Devuelve el valor formateado con separadores de miles para mostrar en pantalla
    // ej: 111000000 → "111.000.000"
    valorFormateado() {
        return this.valor.toLocaleString('es-AR');
    }
}
