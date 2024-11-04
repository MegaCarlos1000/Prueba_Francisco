from django.db import models
from django.core.validators import MinValueValidator
from datetime import date

from django.db import models
from django.core.validators import MinValueValidator

class Juego(models.Model):
    PEGI_CHOICES = [
        (3, 'PEGI 3: Apto para todas las edades. No contiene contenido inapropiado.'),
        (7, 'PEGI 7: Apto para mayores de 7 años. Puede incluir miedo o violencia leve.'),
        (12, 'PEGI 12: Apto para mayores de 12 años. Puede contener violencia moderada o lenguaje inapropiado.'),
        (16, 'PEGI 16: Apto para mayores de 16 años. Puede incluir violencia más intensa, lenguaje fuerte, o contenido sexual insinuado.'),
        (18, 'PEGI 18: Apto solo para adultos. Puede contener violencia extrema, contenido sexual explícito, o uso de drogas.'),
    ]
    
    nombre = models.CharField(max_length=50, verbose_name='Nombre del Juego')
    genero = models.CharField(max_length=50, verbose_name='Género')
    precio = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='Precio', 
        validators=[MinValueValidator(0,message="El valor no puede ser negativo")]
    )
    pegi = models.IntegerField(
        choices=PEGI_CHOICES, 
        verbose_name='PEGI'
    )
    fecha_salida = models.DateField(verbose_name='Fecha de Salida')
    plataforma = models.CharField(max_length=50, verbose_name='Plataforma')

    def __str__(self):
        return self.nombre


ESTADO_CHOICES = [
    (1, 'Activo'),
    (2, 'Inactivo')
]

class Jugador(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    tag = models.CharField(max_length=50)
    edad = models.IntegerField()
    correo = models.EmailField(max_length=50)
    estado = models.IntegerField(
        choices=ESTADO_CHOICES
    )

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Sistema(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE, related_name='sistemas') 
    nombre_distribuidora = models.CharField(max_length=100, verbose_name='Nombre de la Distribuidora')
    nombre_desarrolladora = models.CharField(max_length=100, verbose_name='Nombre de la Desarrolladora')
    descuento = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Descuento (%)')
    juegos = models.ManyToManyField(Juego, related_name='sistemas')  

    def __str__(self):
        return self.nombre_distribuidora
