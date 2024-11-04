from django import forms
from django.core.exceptions import ValidationError
from datetime import date
from aplicacion.models import Juego,Jugador,Sistema

class FormJuego(forms.ModelForm):
    fecha_salida = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        label='Fecha de Salida'
    )

    class Meta:
        model = Juego
        fields = '__all__'

    def clean_fecha_salida(self):
        fecha_salida = self.cleaned_data.get('fecha_salida')
        if fecha_salida and fecha_salida < date.today():
            raise ValidationError("La fecha de salida no puede ser en el pasado.") #este codigo es para el tema de los validores
        return fecha_salida


class FormJugador(forms.ModelForm):
    class Meta:
        model=Jugador
        fields= '__all__'



class FormSistema(forms.ModelForm):
    class Meta:
        model = Sistema
        fields = '__all__'