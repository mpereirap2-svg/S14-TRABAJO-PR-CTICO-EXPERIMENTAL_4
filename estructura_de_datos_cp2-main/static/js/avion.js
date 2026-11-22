function dibujarAvion() {
  const cabina = $("#cabina");
  const v = estado.vuelo;
  cabina.innerHTML = "";

  cabina.append(crearServicio("🍽 Cocina", "🚻 Baño"));

  for (let fila = 1; fila <= v.filas; fila++) {

    if (fila === 1) cabina.append(crear("div", "separador ejecutiva", "EJECUTIVA"));

    if (fila === v.filas_ejecutiva + 1) cabina.append(crear("div", "separador", "ECONÓMICA"));
    cabina.append(crearFila(fila));
  }

  cabina.append(crearServicio("🚻 Baño", "🍽 Cocina"));
}

function crearServicio(izquierda, derecha) {
  const zona = crear("div", "servicio");
  zona.append(crear("span", "", izquierda), crear("span", "", derecha));
  return zona;
}

function crearFila(fila) {
  const v = estado.vuelo;
  const esEjecutiva = fila <= v.filas_ejecutiva;
  const letras = esEjecutiva ? v.letras_ejecutiva : v.letras_economica;

  const divFila = crear("div", esEjecutiva ? "fila fila-ejecutiva" : "fila");

  if (v.filas_salida.includes(fila)) divFila.classList.add("fila-salida");

  const izquierda = crear("div", "lado");
  const derecha = crear("div", "lado");

  for (const letra of letras) {
    const boton = crearAsiento(fila + letra);
    if (letra < "D") izquierda.append(boton);
    else derecha.append(boton);
  }

  divFila.append(crear("span", "ventana"), izquierda,
                 crear("span", "numero-fila", String(fila)),
                 derecha, crear("span", "ventana"));
  return divFila;
}

function crearAsiento(codigo) {
  const boton = crear("button", "asiento libre", codigo.slice(-1));
  boton.type = "button";
  boton.dataset.asiento = codigo;

  boton.addEventListener("click", () => clicEnAsiento(codigo));
  return boton;
}
