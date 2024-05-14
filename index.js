import { AnuncioAutomovil } from "./anuncio-automovil.js";
import { leer_async, escribir_async, borrar_async } from "./local-storage-async.js";

const KEY_STORAGE = "autos"
const items = []
document.addEventListener("DOMContentLoaded", () => {
    onInit();
    document.addEventListener("click",(e) =>  handleClick(e));
});


const formulario = document.getElementById("formAutos");


function handleClick(e) {
    if (e.target.matches("td")) { // Si clickeo una celda
        let id = e.target.parentNode.dataset.id; // Obtener el id de la fila
        console.log(id);
        console.log(items);
        let anuncio = items.filter(a => a.id == id)[0];
        console.log(anuncio);
        cargarFormulario(
            anuncio.titulo,
            anuncio.descripcion,
            anuncio.precio,
            anuncio.puertas,
            anuncio.kms,
            anuncio.potencia,
            anuncio.transaccion
        )
    }
}
function cargarFormulario(...datos) {
    formulario.querySelector("#titulo").value = datos[0];
    formulario.querySelector("#descripcion").value = datos[1];
    formulario.querySelector("#precio").value = datos[2];
    formulario.querySelector("#puertas").value = datos[3];
    formulario.querySelector("#kms").value = datos[4];
    formulario.querySelector("#potencia").value = datos[5];
    if (datos[6] == "Venta") {

        formulario.querySelector("#rVenta").checked = true;
        formulario.querySelector("#rAlquiler").checked = false;
    }
    else {
        formulario.querySelector("#rVenta").checked = false;
        formulario.querySelector("#rAlquiler").checked = true;
    }
    
}

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
            obj.potencia
        );
    
        items.push(model);
    });
}

function escucharFormulario() {
    formulario.addEventListener("submit", async (e) => {
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
        await escribir_async(KEY_STORAGE, str);

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
    let selectedText = '';

    radios.forEach(radio => {
        if (radio.checked) {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            if (label) {
                selectedText = label.textContent;
            }
        }
    });

    return selectedText;
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
            if (celda == "id") {
                nuevaFila.setAttribute("data-id", item[celda])
            }
            else {
                let nuevaCelda = document.createElement("td");
                nuevaCelda.textContent = item[celda];
                nuevaFila.appendChild(nuevaCelda);
            }

        });

        tbody.appendChild(nuevaFila);
    });
  }