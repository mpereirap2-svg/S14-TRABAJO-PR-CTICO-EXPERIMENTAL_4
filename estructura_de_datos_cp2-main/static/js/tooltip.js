function mostrarTooltip(codigo, evento) {
  const tooltip = $("#tooltip");
  const p = estado.porAsiento[codigo];
  const clase = claseDeAsiento(codigo);
  tooltip.innerHTML = p
    ? `<b>${escapar(p.nombre)}</b> ${p.edad < 18 ? "🧒" : ""}<br>Asiento ${codigo} · ${clase}<br>` +
      `<small>Reserva #${p.numero} · clic para ver su pase</small>`
    : `<b>Asiento ${codigo}</b><br>${clase} · <span style="color:#86EFAC">libre</span><br><small>clic para elegirlo</small>`;
  tooltip.hidden = false;
  moverTooltip(evento);
}

function moverTooltip(evento) {
  const tooltip = $("#tooltip");
  tooltip.style.left = evento.clientX + 16 + "px";
  tooltip.style.top = evento.clientY + 16 + "px";
}

function ocultarTooltip() {
  $("#tooltip").hidden = true;
}

$("#cabina").addEventListener("mouseover", (evento) => {
  const boton = evento.target.closest(".asiento");
  if (boton) mostrarTooltip(boton.dataset.asiento, evento);
});
$("#cabina").addEventListener("mousemove", (evento) => {
  if (!$("#tooltip").hidden) moverTooltip(evento);
});
$("#cabina").addEventListener("mouseout", (evento) => {
  if (evento.target.closest(".asiento")) ocultarTooltip();
});
