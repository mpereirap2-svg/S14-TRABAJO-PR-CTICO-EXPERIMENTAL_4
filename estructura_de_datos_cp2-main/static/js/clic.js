async function clicEnAsiento(codigo) {

  if (estado.porAsiento[codigo]) {
    cambiarPestana("buscar");
    $('input[name="tipo"][value="asiento"]').checked = true;
    $("#buscar-valor").value = codigo;
    await buscar("asiento", codigo);
    return;
  }

  if (estado.enEdicion) {
    estado.seleccionado = codigo;
    $("#modificar-asiento").textContent = codigo;
    pintarAsientos();
    return;
  }

  if (estado.pestana !== "reservar") cambiarPestana("reservar");
  estado.seleccionado = estado.seleccionado === codigo ? null : codigo;
  estado.encontrado = null;
  actualizarAsientoElegido();
  pintarAsientos();
  if (estado.seleccionado) $('#form-reservar [name="nombre"]').focus({ preventScroll: true });
}
