function actualizarAsientoElegido() {
  const salida = $("#reservar-asiento");
  if (estado.seleccionado) {
    salida.textContent = estado.seleccionado;
    salida.classList.remove("vacio");
    $("#reservar-clase").textContent = "Clase " + claseDeAsiento(estado.seleccionado);
  } else {
    salida.textContent = "—";
    salida.classList.add("vacio");
    $("#reservar-clase").textContent = "Elige uno en el avión";
  }
}

async function reservar(evento) {
  evento.preventDefault();

  if (!estado.seleccionado) {
    avisar("Primero haz clic en un asiento verde del avión", "aviso");
    return;
  }

  const formulario = evento.target;
  const datos = {
    nombre: formulario.nombre.value.trim(),
    cedula: formulario.cedula.value.trim(),
    edad: formulario.edad.value,
    asiento: estado.seleccionado,
  };

  const r = await API.reservar(datos);

  if (!r.ok) return mostrarProblema(r);
  avisar(r.mensaje, "ok");
  for (const aviso of r.avisos) avisar(aviso, "aviso");
  formulario.reset();
  estado.seleccionado = null;
  actualizarAsientoElegido();
  await refrescar(r.datos.numero);
  animarAsiento(r.datos.asiento, "recien");
}

$("#form-reservar").addEventListener("submit", reservar);

for (const boton of $$(".pestana")) {
  boton.addEventListener("click", () => {
    if (boton.dataset.pestana !== "reservar" && estado.seleccionado && !estado.enEdicion) {
      estado.seleccionado = null;
      actualizarAsientoElegido();
      pintarAsientos();
    }
  });
}
