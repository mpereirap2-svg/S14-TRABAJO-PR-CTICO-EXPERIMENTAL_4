const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function crear(etiqueta, clase = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto);
  return div.innerHTML;
}

function claseDeAsiento(asiento) {
  const fila = parseInt(asiento);
  return fila <= estado.vuelo.filas_ejecutiva ? "Ejecutiva" : "Económica";

}

function botonDeAsiento(asiento) {
  return document.querySelector(`.asiento[data-asiento="${asiento}"]`);
}
