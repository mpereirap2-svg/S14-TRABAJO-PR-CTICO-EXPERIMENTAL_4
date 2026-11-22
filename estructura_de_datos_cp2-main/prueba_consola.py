from lista_pasajeros import ListaPasajeros
from pasajero import Pasajero


lista = ListaPasajeros()
lista.ingresar(Pasajero(1005, "Diana", "0923456789", 22, "3C"))
lista.ingresar(Pasajero(1002, "Ana", "0912345678", 28, "1A"))
lista.ingresar(Pasajero(1009, "Luis", "0987654321", 35, "7D"))
lista.ingresar(Pasajero(1004, "Beto", "0934567890", 16, "7E"))
print("ingresar OK: 4 pasajeros ingresados, cantidad =", lista.cantidad)


print("esta_vacia:", lista.esta_vacia())
print("longitud:", lista.longitud())
for pasajero in lista.listar():
    print("   ", pasajero)
print("buscar 1009:", lista.buscar(1009))
print("buscar 9999:", lista.buscar(9999))
print("asiento 7E:", lista.buscar_por_asiento("7E"))
print("cedula de Ana:", lista.buscar_por_cedula("0912345678"))
print("modificar:", lista.modificar(1009, "Luis A.", 36, "9F"))
print("eliminar cabeza:", lista.eliminar(1005))
print("eliminar 9999:", lista.eliminar(9999))
print("ejecutiva:", [str(p) for p in lista.filtrar_por_clase("Ejecutiva")])
