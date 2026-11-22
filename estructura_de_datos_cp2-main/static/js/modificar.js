async function enviarCargar(evento) {
  evento.preventDefault();
  await cargarParaModificar($("#modificar-numero").value);
}

async function cargarParaModificar(numero) {
  const r = await API.buscarNumero(numero);
  if (!r.ok) return mostrarProblema(r);
  const p = r.datos;
  estado.enEdicion = p;
  estado.seleccionado = null;
  const formulario = $("#form-modificar");
  formulario.nombre.value = p.nombre;
  formulario.cedula.value = p.cedula;
  formulario.edad.value = p.edad;
  $("#modificar-asiento").textContent = p.asiento;
  formulario.hidden = false;
  resaltar(p.asiento);
}

async function guardarCambios(evento) {
  evento.preventDefault();
  const p = estado.enEdicion;
  const formulario = evento.target;
  const datos = {
    nombre: formulario.nombre.value.trim(),
    edad: formulario.edad.value,

    asiento: estado.seleccionado || p.asiento,
  };
  const r = await API.modificar(p.numero, datos);
  if (!r.ok) return mostrarProblema(r);
  avisar(r.mensaje, "ok");
  for (const aviso of r.avisos) avisar(aviso, "aviso");
  cancelarEdicion();
  await refrescar();
  animarAsiento(r.datos.asiento, "recien");
  resaltar(r.datos.asiento);
}

function cancelarEdicion() {
  estado.enEdicion = null;
  estado.seleccionado = null;
  $("#form-modificar").hidden = true;
  pintarAsientos();
}

$("#form-cargar").addEventListener("submit", enviarCargar);
$("#form-modificar").addEventListener("submit", guardarCambios);
$("#btn-cancelar-edicion").addEventListener("click", cancelarEdicion);

for (const boton of $$(".pestana")) {
  boton.addEventListener("click", () => {
    if (boton.dataset.pestana !== "modificar" && estado.enEdicion) cancelarEdicion();
  });
}
