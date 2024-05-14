import { Anuncio } from "./anuncio.js";

export class AnuncioAutomovil extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}