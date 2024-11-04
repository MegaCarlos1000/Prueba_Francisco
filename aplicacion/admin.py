from django.contrib import admin
from .models import Juego, Jugador, Sistema

class JuegoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'genero', 'precio', 'pegi', 'fecha_salida', 'plataforma')
    list_filter = ('genero', 'pegi', 'plataforma')
    search_fields = ('nombre', 'genero', 'plataforma')

class JugadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'tag', 'edad', 'correo', 'estado')
    list_filter = ('estado',)
    search_fields = ('nombre', 'apellido', 'tag', 'correo')

class SistemaAdmin(admin.ModelAdmin):
    list_display = ('nombre_distribuidora', 'nombre_desarrolladora', 'descuento', 'jugador')
    list_filter = ('nombre_distribuidora', 'nombre_desarrolladora')
    search_fields = ('nombre_distribuidora', 'nombre_desarrolladora')
    filter_horizontal = ('juegos',) 
    

admin.site.register(Juego, JuegoAdmin)
admin.site.register(Jugador, JugadorAdmin)
admin.site.register(Sistema, SistemaAdmin)
