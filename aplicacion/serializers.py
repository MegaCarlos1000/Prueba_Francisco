from rest_framework import serializers
from aplicacion.models import Juego,Jugador,Sistema

class JuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = "__all__"

class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = "__all__"

class SistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sistema
        fields = "__all__"