from vuelo import clase_de_asiento


class Pasajero:
    def __init__(self, numero, nombre, cedula, edad, asiento):
        self.numero = numero
        self.nombre = nombre
        self.cedula = cedula
        self.edad = edad
        self.asiento = asiento

    def clase(self):
        return clase_de_asiento(self.asiento)

    def es_menor_de_edad(self):
        return self.edad < 18

    def a_diccionario(self):
        return {
            "numero": self.numero,
            "nombre": self.nombre,
            "cedula": self.cedula,
            "edad": self.edad,
            "asiento": self.asiento,
        }

    def __str__(self):
        return (f"#{self.numero} | {self.nombre:<8} | {self.cedula} | "
                f"{self.edad:>2} años | asiento {self.asiento:<3} | {self.clase()}")
