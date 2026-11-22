from lista_pasajeros import Nodo
from pasajero import Pasajero


class ErrorEnTuMetodo(Exception):
    pass


def pasajero_o_none(valor, metodo):
    if valor is None or isinstance(valor, Pasajero):
        return valor
    if isinstance(valor, Nodo):
        raise ErrorEnTuMetodo(f"{metodo}() retornó un Nodo. Retorna el pasajero: actual.data")
    raise ErrorEnTuMetodo(f"{metodo}() debe retornar un Pasajero o None, "
                          f"pero retornó {type(valor).__name__}: {valor!r}")


def lista_de_pasajeros(valor, metodo):
    if valor is None:
        raise ErrorEnTuMetodo(f"{metodo}() retornó None. ¿Olvidaste el  return resultado ?")
    if not isinstance(valor, list):
        raise ErrorEnTuMetodo(f"{metodo}() debe retornar una list, pero retornó {type(valor).__name__}")
    for elemento in valor:
        if isinstance(elemento, Nodo):
            raise ErrorEnTuMetodo(f"{metodo}() guardó Nodos en la lista. Guarda el pasajero: actual.data")
        if not isinstance(elemento, Pasajero):
            raise ErrorEnTuMetodo(f"{metodo}() debe guardar objetos Pasajero, pero encontré "
                                  f"{type(elemento).__name__}: {elemento!r}")
    return valor


def booleano(valor, metodo):
    if valor is True or valor is False:
        return valor
    raise ErrorEnTuMetodo(f"{metodo}() debe retornar True o False, pero retornó {valor!r}")


def entero(valor, metodo):
    if isinstance(valor, int) and not isinstance(valor, bool):
        return valor
    raise ErrorEnTuMetodo(f"{metodo}() debe retornar un número entero, pero retornó {valor!r}")
