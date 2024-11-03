from django.db import models
from django.core.validators import MinValueValidator
from datetime import date

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
        validators=[MinValueValidator(0)]
    )
    pegi = models.IntegerField(
        choices=PEGI_CHOICES, 
        verbose_name='PEGI'
    )
    fecha_salida = models.DateField(verbose_name='Fecha de Salida')
    plataforma = models.CharField(max_length=50, verbose_name='Plataforma')

    def __str__(self):
        return self.nombre
