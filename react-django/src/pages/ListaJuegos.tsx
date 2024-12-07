import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Lista.css"

interface Game {
  id: number;
  nombre: string;
  genero: string;
  precio: string;
  pegi: number;
  fecha_salida: string;
  plataforma: string;
}

const ListaJuego: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/juegoapi1/');
        setGames(response.data);
      } catch (err: any) {
        setError(err.response?.data || 'Error al cargar los juegos');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Handle Eliminar
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/juegoapi2/${id}`);
        setGames(games.filter((game) => game.id !== id));
        alert('Juego eliminado con éxito.');
      } catch (error: any) {
        console.error('Error al eliminar el juego:', error);
        alert('Error al eliminar el juego.');
      }
    }
  };

  //Handle Actualizar
  const handleUpdate = (id: number) => {
    navigate(`/Actualizar-juego/${id}`);
  };

  if (loading) return <p style={{textAlign:'center',color:"blue",fontSize:"50px"}}>Cargando juegos...</p>;
  if (error) return <p style={{textAlign:'center',color:"blue",fontSize:"50px"}}>Error: {error}</p>;

  return (
    <div className="ListaGame">
      <h1>Lista de Juegos</h1>
      {games.length === 0 ? (
        <p>No hay juegos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Precio</th>
              <th>PEGI</th>
              <th>Fecha de Salida</th>
              <th>Plataforma</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.nombre}</td>
                <td>{game.genero}</td>
                <td>${game.precio}</td>
                <td>{game.pegi}</td>
                <td>{game.fecha_salida}</td>
                <td>{game.plataforma}</td>
                <td>
                  <button  onClick={() => handleUpdate(game.id)}>Actualizar</button>
                  <button style={{background :"red"}}onClick={() => handleDelete(game.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaJuego;
