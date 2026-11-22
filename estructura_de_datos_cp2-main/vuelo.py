VUELO = {
    "codigo": "AL-204",
    "aerolinea": "AeroLista",
    "origen": "Guayaquil",
    "codigo_origen": "GYE",
    "destino": "Quito",
    "codigo_destino": "UIO",
    "fecha": "2026-12-20",
    "hora": "07:30",
    "filas": 12,
    "filas_ejecutiva": 2,
    "letras_ejecutiva": ["A", "C", "D", "F"],
    "letras_economica": ["A", "B", "C", "D", "E", "F"],
    "filas_salida": [6, 7],
}


def total_asientos():

    ejecutiva = VUELO["filas_ejecutiva"] * len(VUELO["letras_ejecutiva"])

    economica = (VUELO["filas"] - VUELO["filas_ejecutiva"]) * len(VUELO["letras_economica"])
    return ejecutiva + economica


def separar_asiento(asiento):
    asiento = str(asiento).strip().upper()
    if len(asiento) < 2:
        return 0, ""
    fila_texto = asiento[:-1]
    letra = asiento[-1]
    if not fila_texto.isdigit():
        return 0, ""
    return int(fila_texto), letra


def clase_de_asiento(asiento):
    fila, letra = separar_asiento(asiento)
    if fila <= VUELO["filas_ejecutiva"]:
        return "Ejecutiva"
    return "Económica"


def asiento_existe(asiento):
    fila, letra = separar_asiento(asiento)
    if fila < 1 or fila > VUELO["filas"]:
        return False
    if fila <= VUELO["filas_ejecutiva"]:
        return letra in VUELO["letras_ejecutiva"]
    return letra in VUELO["letras_economica"]
