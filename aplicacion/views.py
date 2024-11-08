from django.shortcuts import render, redirect, get_object_or_404
from aplicacion.forms import FormJuego,FormJugador,FormSistema
from django.contrib import messages
from aplicacion.models import Juego,Jugador,Sistema

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


def listado(request):
    jugadores=Jugador.objects.all()
    data ={'jugadores':jugadores}
    return render(request,'templatesApp/ListaJugadores.html', data)

def agregarJugadores(request):
    form = FormJugador()
    if request.method == 'POST':
        form = FormJugador(request.POST)
        if form.is_valid():
            form.save()
        return index(request)
    data ={'form':form}
    return render(request, 'templatesApp/AgregarJugadores.html',data)

def eliminarJugador(request, id):
    jugador=Jugador.objects.get(id=id)
    jugador.delete()
    return redirect('/ListaJugadores.html')

def actualizarJugador(request,id):
    jugador=Jugador.objects.get(id=id)
    form=FormJugador(instance=jugador)
    if request.method == 'POST':
        form = FormJugador(request.POST, instance=jugador)
        if form.is_valid():
            form.save()
        return index(request)
    data={'form':form}
    return render(request, 'templatesApp/AgregarJugadores.html',data)


def listadosistema(request):
    sistemas = Sistema.objects.all()
    return render(request, 'templatesApp/ListaSistemas.html', {'sistemas': sistemas})

def agregarsistema(request):
    form = FormSistema()
    if request.method == 'POST':
        form = FormSistema(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listadosistema')
    return render(request, 'templatesApp/AgregarSistema.html', {'form': form})


def eliminarsistema(request, id):
    sistema=Sistema.objects.get(id=id)
    sistema.delete()
    return redirect('/ListaSistemas.html')

def actualizarsistema(request,id):
    sistema=Sistema.objects.get(id=id)
    form=FormSistema(instance=sistema)
    if request.method == 'POST':
        form = FormSistema(request.POST, instance=sistema)
        if form.is_valid():
            form.save()
        return index(request)
    data={'form':form}
    return render(request, 'templatesApp/AgregarSistema.html',data)
