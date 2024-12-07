import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Actualizar.css";

interface FormData {
  nombre: string;
  apellido: string;
  tag: string;
  edad: number;
  correo: string;
  estado: number;
}

const ActualizarJugador: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    tag: '',
    edad: 0,
    correo: '',
    estado: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/jugadorapi2/${id}`);
        setFormData(response.data);
      } catch (error: any) {
        setError(error.response?.data || 'Error al cargar los datos del jugador');
      } finally {
        setLoading(false);
      }
    };

    fetchJugador();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'edad' || name === 'estado' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/jugadorapi2/${id}`, formData);
      alert('Jugador actualizado con éxito');
      navigate('/Lista-jugador');
    } catch (error: any) {
      console.error('Error al actualizar el jugador:', error);
      alert('Error al actualizar el jugador.');
    }
  };

  if (loading) return <p>Cargando datos del jugador...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="UpdateJugador">
      <h1>Actualizar Jugador</h1>
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
          Apellido:
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tag:
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Estado:
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value={0}>Activo</option>
            <option value={1}>Inactivo</option>
          </select>
        </label>
        <button type="submit">Actualizar Jugador</button>
      </form>
    </div>
  );
};

export default ActualizarJugador;
