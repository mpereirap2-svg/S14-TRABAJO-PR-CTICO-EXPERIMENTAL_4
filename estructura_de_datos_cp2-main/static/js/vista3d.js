function cambiarVista(vista) {
  estado.vista = vista;
  $("#avion").classList.toggle("vista-3d", vista === "3d");
  $("#ajustes-3d").hidden = vista !== "3d";
  for (const boton of $$(".btn-vista")) {
    boton.classList.toggle("activo", boton.dataset.vista === vista);
  }
  aplicarAngulos();
}

function aplicarAngulos() {
  const avion = $("#avion");
  const en3D = estado.vista === "3d";

  avion.style.setProperty("--inclinacion", (en3D ? $("#rango-inclinacion").value : 0) + "deg");
  avion.style.setProperty("--giro", (en3D ? $("#rango-giro").value : 0) + "deg");
  ajustarEscena();
}

function proyectar(x, y, giro, incl) {
  const x1 = x * Math.cos(giro) - y * Math.sin(giro);
  const y1 = x * Math.sin(giro) + y * Math.cos(giro);
  const y2 = y1 * Math.cos(incl);
  const z2 = y1 * Math.sin(incl);
  const factor = 1800 / (1800 - z2);
  return [x1 * factor, y2 * factor];
}

function ajustarEscena() {
  const avion = $("#avion");
  const escena = $("#escena");
  const mitadAncho = avion.offsetWidth / 2;
  const mitadAlto = avion.offsetHeight / 2;
  const en3D = estado.vista === "3d";

  const giro = en3D ? ($("#rango-giro").value * Math.PI) / 180 : 0;
  const incl = en3D ? ($("#rango-inclinacion").value * Math.PI) / 180 : 0;

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const esquinas = [[-mitadAncho, -mitadAlto], [mitadAncho, -mitadAlto],
                    [mitadAncho, mitadAlto], [-mitadAncho, mitadAlto]];
  for (const [x, y] of esquinas) {
    const [px, py] = proyectar(x, y, giro, incl);
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  }

  const escala = Math.min(1, (escena.clientWidth - 24) / (maxX - minX));
  avion.style.setProperty("--escala", escala.toFixed(3));
  avion.style.setProperty("--ajuste-y", (-(minY + maxY) / 2 * escala).toFixed(1) + "px");
  escena.style.height = Math.round((maxY - minY) * escala + 50) + "px";
}

for (const boton of $$(".btn-vista")) {
  boton.addEventListener("click", () => cambiarVista(boton.dataset.vista));
}

$("#rango-inclinacion").addEventListener("input", aplicarAngulos);
$("#rango-giro").addEventListener("input", aplicarAngulos);

window.addEventListener("resize", ajustarEscena);
