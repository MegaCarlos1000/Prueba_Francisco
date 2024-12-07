from django.contrib import admin
from django.urls import path
from aplicacion import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('listadojuego/', views.listadojuego, name='listadojuego'),
    path('agregarjuego/', views.agregarjuego, name='agregarjuego'),
    path('juegoapi1/', views.juego_list_api, name='juegoapi1'),  
    path('juegoapi2/<int:pk>', views.juego_detail, name='juegoapi2'), 
    path('jugadorapi1/', views.jugador_list_api, name='jugadorapi1'), 
    path('jugadorapi2/<int:pk>', views.jugador_detail, name='jugadorapi2'),
    path('sistemaapi1/', views.sistema_list_api, name='sistemaapi1'),  
    path('sistemaapi2/<int:pk>/', views.sistema_detail, name='sistemaapi2'),  
    path('eliminarJuego/<int:id>/', views.eliminarJuego, name='eliminarJuego'),  
    path('actualizarJuego/<int:id>/', views.actualizarJuego, name='actualizarJuego'),
    path('AgregarJugadores.html', views.agregarJugadores),
    path('ListaJugadores.html', views.listado),
    path('eliminarJugador/<int:id>', views.eliminarJugador),
    path('actualizarJugador/<int:id>', views.actualizarJugador),
    path('AgregarSistema.html', views.agregarsistema),
    path('ListaSistemas.html', views.listadosistema, name='listadosistema'),
    path('eliminarsistema/<int:id>', views.eliminarsistema),
    path('actualizarsistema/<int:id>', views.actualizarsistema),
]
