from django.shortcuts import render, redirect, get_object_or_404
from aplicacion.forms import FormJuego
from django.contrib import messages
from aplicacion.models import Juego

def index(request):
    return render(request, 'templatesApp/index.html')

def listadojuego(request):
    juegos = Juego.objects.all()
    return render(request, 'templatesApp/lista.html', {'juegos': juegos})

def agregarjuego(request):
    form = FormJuego()
    if request.method == 'POST':
        form = FormJuego(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listadojuego')
    return render(request, 'templatesApp/agregar.html', {'form': form})

def eliminarJuego(request, id):
    juego = get_object_or_404(Juego, id=id)
    juego.delete()
    messages.success(request, f"El juego '{juego.nombre}' ha sido eliminado exitosamente.")
    return redirect('listadojuego')

def actualizarJuego(request, id):
    juego = get_object_or_404(Juego, id=id)
    form = FormJuego(instance=juego)
    if request.method == 'POST':
        form = FormJuego(request.POST, instance=juego)
        if form.is_valid():
            form.save()
            return redirect('listadojuego')
    return render(request, 'templatesApp/agregar.html', {'form': form})
