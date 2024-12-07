import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "../css/CrearJugador.css"; 

interface FormData {
  nombre: string;
  apellido: string;
  tag: string;
  edad: string;
  correo: string;
  estado: number | '';
}

const CrearJugador: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    tag: '',
    edad: '',
    correo: '',
    estado: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'estado' ? parseInt(value, 10) || '' : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/jugadorapi1/', formData);
      console.log('Jugador creado:', response.data);
      alert('Jugador creado con éxito');
    } catch (error: any) {
      console.error('Error al crear el jugador:', error.response?.data || error.message);
      alert('Error al crear el jugador. Revisa los datos e inténtalo nuevamente.');
    }
  };

  return (
    <div className="CreateJugador">
      <h1 style={{textAlign:"center"}}>Crear Jugador</h1>
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
            <option value="">Selecciona una opción</option>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </label>
        <button type="submit">Crear Jugador</button>
      </form>
    </div>
  );
};

export default CrearJugador;
