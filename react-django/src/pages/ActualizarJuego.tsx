import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  nombre: string;
  genero: string;
  precio: string;
  pegi: number | '';
  fecha_salida: string;
  plataforma: string;
}

const ActualizarJuego: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    genero: '',
    precio: '',
    pegi: '',
    fecha_salida: '',
    plataforma: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/juegoapi2/${id}`);
        setFormData(response.data);
      } catch (error: any) {
        setError(error.response?.data || 'Error al cargar los datos del juego');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

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
      await axios.put(`http://127.0.0.1:8000/juegoapi2/${id}`, formData);
      alert('Juego actualizado con éxito');
      navigate('/Lista-juego');
    } catch (error: any) {
      console.error('Error al actualizar el juego:', error);
      alert('Error al actualizar el juego.');
    }
  };

  if (loading) return <p>Cargando datos del juego...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="UpdateGame">
      <h1>Actualizar Juego</h1>
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
        <button type="submit">Actualizar Juego</button>
      </form>
    </div>
  );
};

export default ActualizarJuego;
