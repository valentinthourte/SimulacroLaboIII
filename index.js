import { AnuncioAutomovil } from "./anuncio-automovil.js";
import { leer_async, escribir_async, borrar_async } from "./local-storage-async.js";


const items = []
const KEY_STORAGE = "autos"
document.addEventListener("DOMContentLoaded", () => {
    onInit();
});


const formulario = document.getElementById("formAutos");

async function onInit() {
    await loadItems();
    escucharFormulario();
    rellenarTabla();
}

async function loadItems() {
    let str = await leer_async(KEY_STORAGE);
    const objetos = JSON.parse(str) || [];

    objetos.forEach(obj => {
        const model = new AnuncioAutomovil(
            obj.id,
            obj.titulo,
            obj.transaccion,
            obj.descripcion,
            obj.precio,
            obj.puertas,
            obj.kms,
            obj,potencia
        );
    
        items.push(model);
    });
}

function escucharFormulario() {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = obtenerNuevoId();
        const model = new AnuncioAutomovil(
            id,
            formulario.querySelector("#titulo").value,
            obtenerValorRadio(),

            formulario.querySelector("#descripcion").value,
            formulario.querySelector("#precio").value,
            formulario.querySelector("#puertas").value,
            formulario.querySelector("#kms").value,
            formulario.querySelector("#potencia").value
        );

        items.push(model);

        const str = JSON.stringify(items);
        escribir_async(KEY_STORAGE, str);

        actualizarFormulario();
        rellenarTabla();
    });
}

function obtenerNuevoId() {
    const max = 100000;
    return Math.floor(Math.random() * max);
}

function obtenerValorRadio() {
    const radios = document.querySelectorAll('input[name="transaccion"]');
    let selectedValue;
    radios.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });
    return selectedValue;
}

function actualizarFormulario() {
    formulario.querySelector("#titulo").value = "";
    formulario.querySelector("#descripcion").value = "";
    formulario.querySelector("#precio").value = "";
    formulario.querySelector("#puertas").value = "";
    formulario.querySelector("#kms").value = "";
    formulario.querySelector("#potencia").value = "";
}

function rellenarTabla() {
    const tabla = document.getElementById("table-items");
    let tbody = tabla.getElementsByTagName('tbody')[0];
  
    tbody.innerHTML = '';    
    const celdas = ["id","titulo","transaccion","descripcion","precio","puertas","kms","potencia"];

    items.forEach((item) => {
        let nuevaFila = document.createElement("tr");

        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            nuevaCelda.textContent = item[celda];

            nuevaFila.appendChild(nuevaCelda);
        });

        tbody.appendChild(nuevaFila);
    });
  }