function avisar(texto, tipo = "ok") {

  const iconos = { ok: "✅", aviso: "⚠️", pendiente: "🚧", error: "❌", codigo: "💥" };

  const duracion = tipo === "ok" ? 3500 : 7000;

  const toast = crear("div", "toast toast-" + tipo);
  toast.append(crear("span", "", iconos[tipo]), crear("p", "", texto));
  $("#toasts").append(toast);

  setTimeout(() => toast.classList.add("saliendo"), duracion);
  setTimeout(() => toast.remove(), duracion + 400);
}

function mostrarProblema(r) {
  if (r.pendiente) avisar(r.mensaje, "pendiente");
  else if (r.error_codigo) avisar(r.mensaje + "  (revisa la terminal de Flask)", "codigo");
  else avisar(r.mensaje, "error");
}

function mostrarAviso(selector, r, titulo) {
  const caja = $(selector);
  caja.hidden = false;
  caja.classList.toggle("es-error", !r.pendiente);
  caja.innerHTML = r.pendiente
    ? `🚧 ${titulo} Implementa <code>${r.metodo}()</code> en <code>lista_pasajeros.py</code>, guarda y recarga la página.`
    : `💥 ${escapar(r.mensaje)}`;
}

function ocultarAviso(selector) {
  $(selector).hidden = true;
}
