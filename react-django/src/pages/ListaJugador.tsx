import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Lista.css";

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  tag: string;
  edad: number;
  correo: string;
  estado: number;
}

const ListaJugador: React.FC = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/jugadorapi1/');
        setJugadores(response.data);
      } catch (err: any) {
        setError(err.response?.data || 'Error al cargar los jugadores');
      } finally {
        setLoading(false);
      }
    };

    fetchJugadores();
  }, []);

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/jugadorapi2/${id}`);
        setJugadores(jugadores.filter((jugador) => jugador.id !== id));
        alert('Jugador eliminado con éxito.');
      } catch (error: any) {
        console.error('Error al eliminar el jugador:', error);
        alert('Error al eliminar el jugador.');
      }
    }
  };

  // Manejar actualización
  const handleUpdate = (id: number) => {
    navigate(`/Actualizar-jugador/${id}`);
  };

  if (loading) return <p style={{textAlign:'center',color:"blue",fontSize:"50px"}}>Cargando jugadores...</p>;
  if (error) return <p style={{textAlign:'center',color:"blue",fontSize:"50px"}}>Error: {error}</p>;

  return (
    <div className="ListaJugador">
      <h1>Lista de Jugadores</h1>
      {jugadores.length === 0 ? (
        <p>No hay jugadores disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Tag</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td>{jugador.id}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.apellido}</td>
                <td>{jugador.tag}</td>
                <td>{jugador.edad}</td>
                <td>{jugador.correo}</td>
                <td>{jugador.estado}</td>
                <td>
                  <button onClick={() => handleUpdate(jugador.id)}>Actualizar</button>
                  <button style={{ background: 'red' }} onClick={() => handleDelete(jugador.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaJugador;
