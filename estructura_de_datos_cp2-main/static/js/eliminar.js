function preguntar(titulo, texto) {
  const modal = $("#modal");
  $("#modal-titulo").textContent = titulo;
  $("#modal-texto").textContent = texto;
  modal.showModal();
  return new Promise((resolver) => {

    modal.addEventListener("close", () => resolver(modal.returnValue === "si"), { once: true });
  });
}

async function confirmarEliminar(numero, pasajero = null) {
  const quien = pasajero ? `${pasajero.nombre} (asiento ${pasajero.asiento})` : `la reserva #${numero}`;
  const acepta = await preguntar("¿Cancelar la reserva?",
    `Se quitará a ${quien} y el asiento quedará libre.`);
  if (!acepta) return false;

  const r = await API.eliminar(numero);
  if (!r.ok) {
    mostrarProblema(r);
    return false;
  }
  avisar(r.mensaje, "ok");
  $("#eliminar-numero").value = "";

  if (estado.enEdicion && estado.enEdicion.numero === r.datos.numero) cancelarEdicion();
  estado.encontrado = null;
  await refrescar();
  animarAsiento(r.datos.asiento, "liberado");
  return true;
}

async function enviarEliminar(evento) {
  evento.preventDefault();
  await confirmarEliminar($("#eliminar-numero").value);
}

$("#form-eliminar").addEventListener("submit", enviarEliminar);
