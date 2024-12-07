import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Lista.css";

interface Sistema {
  id: number;
  nombre_distribuidora: string;
  nombre_desarrolladora: string;
  descuento: string;
  jugador: number;  // ID del jugador
  juegos: number[]; // Lista de IDs de los juegos
}

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
}

interface Juego {
  id: number;
  nombre: string;
}

const ListaSistema: React.FC = () => {
  const [sistemas, setSistemas] = useState<Sistema[]>([]);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traemos la lista de sistemas
        const sistemasResponse = await axios.get('http://127.0.0.1:8000/sistemaapi1/');
        setSistemas(sistemasResponse.data);

        // Traemos la lista de jugadores
        const jugadoresResponse = await axios.get('http://127.0.0.1:8000/jugadorapi1/');
        setJugadores(jugadoresResponse.data);

        // Traemos la lista de juegos
        const juegosResponse = await axios.get('http://127.0.0.1:8000/juegoapi1/');
        setJuegos(juegosResponse.data);
      } catch (err: any) {
        setError(err.response?.data || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este sistema?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/sistemaapi2/${id}/`);
        setSistemas(sistemas.filter((sistema) => sistema.id !== id));
        alert('Sistema eliminado con éxito.');
      } catch (error: any) {
        console.error('Error al eliminar el sistema:', error);
        alert('Error al eliminar el sistema.');
      }
    }
  };

  // Manejar actualización
  const handleUpdate = (id: number) => {
    navigate(`/Actualizar-sistema/${id}`);
  };

  if (loading) return <p style={{textAlign:'center', color:"blue", fontSize:"50px"}}>Cargando sistemas...</p>;
  if (error) return <p style={{textAlign:'center', color:"blue", fontSize:"50px"}}>Error: {error}</p>;

  // Función para obtener el nombre del jugador por su ID
  const getJugadorNombre = (id: number) => {
    const jugador = jugadores.find((j) => j.id === id);
    return jugador ? `${jugador.nombre} ${jugador.apellido}` : 'Jugador no encontrado';
  };

  // Función para obtener los nombres de los juegos por sus IDs
  const getJuegosNombres = (ids: number[]) => {
    return ids.map((id) => {
      const juego = juegos.find((j) => j.id === id);
      return juego ? juego.nombre : 'Juego no encontrado';
    }).join(', ');
  };

  return (
    <div className="ListaSistema">
      <h1>Lista de Sistemas</h1>
      {sistemas.length === 0 ? (
        <p>No hay sistemas disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Distribuidora</th>
              <th>Desarrolladora</th>
              <th>Descuento</th>
              <th>Jugador</th>  {/* Mostrar nombre del jugador */}
              <th>Juegos</th>   {/* Mostrar nombres de los juegos */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sistemas.map((sistema) => (
              <tr key={sistema.id}>
                <td>{sistema.id}</td>
                <td>{sistema.nombre_distribuidora}</td>
                <td>{sistema.nombre_desarrolladora}</td>
                <td>{sistema.descuento}</td>
                <td>{getJugadorNombre(sistema.jugador)}</td>   {/* Mostrar nombre del jugador */}
                <td>{getJuegosNombres(sistema.juegos)}</td>  {/* Mostrar nombres de los juegos */}
                <td>
                  <button onClick={() => handleUpdate(sistema.id)}>Actualizar</button>
                  <button style={{ background: 'red' }} onClick={() => handleDelete(sistema.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaSistema;
