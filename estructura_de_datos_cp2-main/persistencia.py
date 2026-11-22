import json
import os
from pasajero import Pasajero


CARPETA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
ARCHIVO = os.path.join(CARPETA, "reservas.json")
EJEMPLO = os.path.join(CARPETA, "ejemplo.json")


siguiente_numero = 1001


def cargar(lista, ruta=ARCHIVO):
    global siguiente_numero
    if not os.path.exists(ruta):
        ruta = EJEMPLO

    with open(ruta, "r", encoding="utf-8") as archivo:
        contenido = json.load(archivo)

    for d in contenido["reservas"]:
        pasajero = Pasajero(d["numero"], d["nombre"], d["cedula"], d["edad"], d["asiento"])
        lista.ingresar(pasajero)

    siguiente_numero = contenido["siguiente_numero"]


def guardar(lista):
    reservas = []
    actual = lista.head
    while actual is not None:
        reservas.append(actual.data.a_diccionario())
        actual = actual.next
        if len(reservas) > 1000:
            raise RuntimeError("La lista no termina nunca: ¿un nodo se apunta a sí mismo?")

    contenido = {"siguiente_numero": siguiente_numero, "reservas": reservas}
    os.makedirs(CARPETA, exist_ok=True)

    with open(ARCHIVO, "w", encoding="utf-8") as archivo:
        json.dump(contenido, archivo, ensure_ascii=False, indent=2)


def nuevo_numero():
    global siguiente_numero
    numero = siguiente_numero
    siguiente_numero = siguiente_numero + 1
    return numero


def restaurar(lista):
    lista.head = None
    lista.cantidad = 0
    cargar(lista, EJEMPLO)
    guardar(lista)
