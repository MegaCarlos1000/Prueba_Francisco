"""Prueba URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from aplicacion import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('listadojuego/', views.listadojuego, name='listadojuego'),
    path('agregarjuego/', views.agregarjuego, name='agregarjuego'),
    path('juegoapi1/', views.juego_list_api),
    path('juegoapi2/<int:pk>', views.juego_detail), 
    path('eliminarJuego/<int:id>/', views.eliminarJuego, name='eliminarJuego'),  
    path('actualizarJuego/<int:id>/', views.actualizarJuego, name='actualizarJuego'),
    path('AgregarJugadores.html', views.agregarJugadores),
    path('ListaJugadores.html', views.listado),
    path('eliminarJugador/<int:id>', views.eliminarJugador),
    path('actualizarJugador/<int:id>', views.actualizarJugador),
    path('AgregarSistema.html', views.agregarsistema),
    path('ListaSistemas.html', views.listadosistema,name='listadosistema'),
    path('eliminarsistema/<int:id>', views.eliminarsistema),
    path('actualizarsistema/<int:id>', views.actualizarsistema),
]
