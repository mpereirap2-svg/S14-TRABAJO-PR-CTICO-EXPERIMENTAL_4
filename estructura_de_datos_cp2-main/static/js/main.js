const estado = {
  vuelo: null,
  vista: "3d",
  reservas: [],
  porAsiento: {},
  seleccionado: null,
  encontrado: null,
  enEdicion: null,
  pestana: "reservar",
  filtroClase: "",
};

async function refrescar(numeroNuevo = null) {
  const r = await cargarReservas();
  dibujarTren(r, numeroNuevo);
  await cargarResumen();
}

async function iniciar() {
  const r = await API.vuelo();
  if (!r.ok) {
    avisar(r.mensaje, "codigo");
    return;
  }
  estado.vuelo = r.datos;
  dibujarAvion();
  aplicarAngulos();
  await refrescar();
  avisar(`Vuelo ${estado.vuelo.codigo} listo · haz clic en un asiento`);
  await cargarProgreso();
}

iniciar();
