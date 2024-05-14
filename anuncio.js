export class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.precio = +precio;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
      }
}