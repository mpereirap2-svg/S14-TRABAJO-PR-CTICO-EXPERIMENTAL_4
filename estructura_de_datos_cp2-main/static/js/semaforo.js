function iconoPasajero() {
  return `<svg class="icono-pasajero" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="6.5" r="4.5"/>
            <path d="M3 23c0-5.5 4-9.5 9-9.5s9 4 9 9.5z"/>
          </svg>`;
}

async function cargarReservas() {
  const r = await API.listar();
  estado.porAsiento = {};
  if (r.ok) {
    estado.reservas = r.datos;

    for (const pasajero of r.datos) {
      estado.porAsiento[pasajero.asiento] = pasajero;
    }
    ocultarAviso("#aviso-avion");
  } else {
    estado.reservas = [];
    mostrarAviso("#aviso-avion", r, "El avión todavía no puede ver las reservas.");
  }
  pintarAsientos();
  return r;
}

function pintarAsientos() {
  for (const boton of $$(".asiento")) {
    const codigo = boton.dataset.asiento;
    const pasajero = estado.porAsiento[codigo];

    boton.classList.remove("libre", "seleccionado", "ocupado", "encontrado", "editando", "menor");

    if (pasajero) {
      boton.classList.add("ocupado");
      if (pasajero.edad < 18) boton.classList.add("menor");
      boton.innerHTML = iconoPasajero();
      boton.setAttribute("aria-label", `Asiento ${codigo}: ${pasajero.nombre}`);
    } else {
      boton.classList.add(codigo === estado.seleccionado ? "seleccionado" : "libre");
      boton.textContent = codigo.slice(-1);
      boton.setAttribute("aria-label", `Asiento ${codigo}: libre`);
    }
    if (codigo === estado.encontrado) boton.classList.add("encontrado");

    if (estado.enEdicion && codigo === estado.enEdicion.asiento) boton.classList.add("editando");
  }
}

function animarAsiento(asiento, animacion) {
  const boton = botonDeAsiento(asiento);
  if (!boton) return;
  boton.classList.remove(animacion);
  void boton.offsetWidth;
  boton.classList.add(animacion);
  setTimeout(() => boton.classList.remove(animacion), 1000);
}

function enfocarAsiento(asiento) {
  const boton = botonDeAsiento(asiento);
  if (boton) boton.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resaltar(asiento) {
  estado.encontrado = asiento;
  pintarAsientos();
  enfocarAsiento(asiento);
}
