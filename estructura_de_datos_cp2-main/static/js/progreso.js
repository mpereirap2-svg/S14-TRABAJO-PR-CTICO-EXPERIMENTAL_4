const ICONOS_PROGRESO = { ok: "✅", pendiente: "🚧", fallo: "❌", error: "💥", lento: "⏳" };

async function cargarProgreso() {
  const lista = $("#progreso-lista");
  const r = await API.progreso();
  lista.innerHTML = "";
  if (API.modo === "demo") {
    $("#progreso-cuenta").textContent = "demo";
    lista.innerHTML = `<li><span>🧪</span><span>Modo de prueba: los datos vienen de <code>datos-demo.js</code>.</span></li>`;
    return false;
  }
  if (!r.ok) {
    lista.innerHTML = `<li class="error"><span>💥</span><span>${escapar(r.mensaje)}</span></li>`;
    return false;
  }

  const listos = r.datos.filter((m) => m.estado === "ok").length;
  $("#progreso-cuenta").textContent = `${listos}/${r.datos.length}`;
  $("#progreso-barra").style.width = (listos * 100) / r.datos.length + "%";
  for (const m of r.datos) {
    const item = crear("li", m.estado);
    item.innerHTML = `<span>${ICONOS_PROGRESO[m.estado]}</span><code>${m.metodo}()</code>`;

    if (m.estado !== "ok" && m.estado !== "pendiente") item.append(crear("small", "", m.detalle));
    lista.append(item);
  }
  return listos === r.datos.length;
}

async function revisarProgreso() {
  const completo = await cargarProgreso();
  if (completo) avisar("¡Backend completo! Todos tus métodos pasaron las pruebas 🎉", "ok");
  await refrescar();
}

async function restaurarDatos() {
  const acepta = await preguntar("¿Restaurar los datos de ejemplo?",
    "Se borrarán las reservas actuales y volverán las 12 reservas de prueba.");
  if (!acepta) return;
  const r = await API.restaurar();
  if (!r.ok) return mostrarProblema(r);
  avisar(r.mensaje, "ok");
  estado.encontrado = null;
  await refrescar();
}

$("#btn-revisar").addEventListener("click", revisarProgreso);
$("#btn-restaurar").addEventListener("click", restaurarDatos);
