import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  nombre: string;
  genero: string;
  precio: string;
  pegi: number | '';
  fecha_salida: string;
  plataforma: string;
}

const CreateGame: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    genero: '',
    precio: '',
    pegi: '',
    fecha_salida: '',
    plataforma: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'pegi' ? parseInt(value, 10) || '' : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/juegoapi1/', formData);
      console.log('Juego creado:', response.data);
      alert('Juego creado con éxito');
    } catch (error: any) {
      console.error('Error al crear el juego:', error.response?.data || error.message);
      alert('Error al crear el juego. Revisa los datos e inténtalo nuevamente.');
    }
  };

  return (
    <div className="CreateGame">
      <h1>Crear Juego</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Género:
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          PEGI:
          <select
            name="pegi"
            value={formData.pegi}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value={3}>PEGI 3</option>
            <option value={7}>PEGI 7</option>
            <option value={12}>PEGI 12</option>
            <option value={16}>PEGI 16</option>
            <option value={18}>PEGI 18</option>
          </select>
        </label>
        <label>
          Fecha de Salida:
          <input
            type="date"
            name="fecha_salida"
            value={formData.fecha_salida}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Plataforma:
          <input
            type="text"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Crear Juego</button>
      </form>
    </div>
  );
};

export default CreateGame;
