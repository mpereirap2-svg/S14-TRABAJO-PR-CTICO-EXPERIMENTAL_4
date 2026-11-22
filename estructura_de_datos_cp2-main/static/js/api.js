const SEGUNDOS_DE_ESPERA = 6;

async function pedir(url, metodo = "GET", cuerpo = null, espera = SEGUNDOS_DE_ESPERA) {

  const controlador = new AbortController();
  const reloj = setTimeout(() => controlador.abort(), espera * 1000);

  const opciones = { method: metodo, signal: controlador.signal, headers: {} };
  if (cuerpo !== null) {
    opciones.headers["Content-Type"] = "application/json";
    opciones.body = JSON.stringify(cuerpo);
  }

  try {
    const respuesta = await fetch(url, opciones);
    return await respuesta.json();
  } catch (error) {
    if (error.name === "AbortError") {
      return { ok: false, error_codigo: true,
               mensaje: `Flask no respondió en ${espera} s. ¿Hay un bucle infinito? ` +
                        "Revisa que avances con actual = actual.next y reinicia Flask (Ctrl+C)." };
    }
    return { ok: false, error_codigo: true,
             mensaje: "No hay conexión con Flask. ¿Está encendido? → python app.py" };
  } finally {
    clearTimeout(reloj);
  }
}

const API = {};

API.vuelo = () => pedir("/api/vuelo");

API.resumen       = ()              => pedir("/api/resumen");
API.listar        = (clase = "")    => pedir("/api/reservas" + (clase ? "?clase=" + encodeURIComponent(clase) : ""));
API.buscarNumero  = (numero)        => pedir("/api/reservas/" + numero);
API.buscarAsiento = (asiento)       => pedir("/api/asientos/" + encodeURIComponent(asiento));
API.buscarCedula  = (cedula)        => pedir("/api/cedulas/" + encodeURIComponent(cedula));
API.reservar      = (datos)         => pedir("/api/reservas", "POST", datos);
API.modificar     = (numero, datos) => pedir("/api/reservas/" + numero, "PUT", datos);
API.eliminar      = (numero)        => pedir("/api/reservas/" + numero, "DELETE");
API.restaurar     = ()              => pedir("/api/restaurar", "POST");

API.progreso = () => pedir("/api/progreso", "GET", null, 20);
