from rest_framework import serializers
from aplicacion.models import Juego,Jugador,Sistema

class FormJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = "__all__"

class FormJugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = "__all__"

class FormSistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sistema
        fields = "__all__"