async function cargarTabla() {

  const r = await API.listar(estado.filtroClase);
  const cuerpo = $("#tabla-reservas");
  cuerpo.innerHTML = "";

  if (!r.ok) {
    cuerpo.innerHTML = `<tr><td colspan="5" class="sin-datos">${r.pendiente ? "🚧" : "💥"} ${escapar(r.mensaje)}</td></tr>`;
    return;
  }
  if (r.datos.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="5" class="sin-datos">No hay pasajeros en esta clase</td></tr>`;
    return;
  }

  r.datos.forEach((p, i) => {
    const fila = crear("tr");
    const ejecutiva = claseDeAsiento(p.asiento) === "Ejecutiva" ? "ejecutiva" : "";
    fila.innerHTML = `<td>${i}</td><td>${p.numero}</td><td>${escapar(p.nombre)}${p.edad < 18 ? " 🧒" : ""}</td>
                      <td>${p.edad}</td><td><span class="etiqueta-asiento ${ejecutiva}">${escapar(p.asiento)}</span></td>`;
    fila.addEventListener("click", () => resaltar(p.asiento));
    cuerpo.append(fila);
  });
}

function elegirFiltro(evento) {
  const chip = evento.target.closest(".chip");
  if (!chip) return;
  estado.filtroClase = chip.dataset.clase;
  for (const otro of $$(".chip")) otro.classList.toggle("activo", otro === chip);
  cargarTabla();
}

$(".filtros").addEventListener("click", elegirFiltro);

$('.pestana[data-pestana="listar"]').addEventListener("click", cargarTabla);
