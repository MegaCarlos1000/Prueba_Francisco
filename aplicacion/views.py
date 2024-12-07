from django.shortcuts import render, redirect, get_object_or_404
from aplicacion.forms import FormJuego,FormJugador,FormSistema
from django.contrib import messages
from aplicacion.models import Juego,Jugador,Sistema
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import JuegoSerializer, JugadorSerializer, SistemaSerializer
@api_view(["GET", "POST"])
def juego_list_api(request):
    if request.method == "GET":
        juego = Juego.objects.all()
        serializer = JuegoSerializer(juego, many = True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = JuegoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

@api_view(["GET","PUT","DELETE"])
def juego_detail(request, pk):
    try:
        juego = Juego.objects.get(pk=pk)
    except Juego.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JuegoSerializer(juego)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = JuegoSerializer(juego, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        juego.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(["GET", "POST"])
def jugador_list_api(request):
    if request.method == "GET":
        jugadores = Jugador.objects.all()
        serializer = JugadorSerializer(jugadores, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = JugadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def jugador_detail(request, pk):
    try:
        jugador = Jugador.objects.get(pk=pk)
    except Jugador.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = JugadorSerializer(jugador)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = JugadorSerializer(jugador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        jugador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(["GET", "POST"])
def sistema_list_api(request):
    if request.method == "GET":
        sistemas = Sistema.objects.all()
        serializer = SistemaSerializer(sistemas, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = SistemaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET", "PUT", "DELETE"])
def sistema_detail(request, pk):
    try:
        sistema = Sistema.objects.get(pk=pk)
    except Sistema.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SistemaSerializer(sistema)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = SistemaSerializer(sistema, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        sistema.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



    
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



