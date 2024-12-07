import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "../css/CrearJugador.css"


interface FormData {
  nombre_distribuidora: string;
  nombre_desarrolladora: string;
  descuento: string;
  jugador: string;  // ID del jugador seleccionado
  juegos: string[]; // IDs de los juegos seleccionados
}

const CrearSistema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre_distribuidora: '',
    nombre_desarrolladora: '',
    descuento: '',
    jugador: '',
    juegos: [],
  });
  const [jugadores, setJugadores] = useState<any[]>([]); // Aquí almacenaremos la lista de jugadores
  const [juegos, setJuegos] = useState<any[]>([]); // Aquí almacenaremos la lista de juegos
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traemos la lista de jugadores
        const jugadoresResponse = await axios.get('http://127.0.0.1:8000/jugadorapi1/');
        setJugadores(jugadoresResponse.data);

        // Traemos la lista de juegos
        const juegosResponse = await axios.get('http://127.0.0.1:8000/juegoapi1/');
        setJuegos(juegosResponse.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'juegos') {
      const selectElement = e.target as HTMLSelectElement;
      const selectedGames = Array.from(selectElement.selectedOptions, (option) => option.value);
      setFormData({ ...formData, juegos: selectedGames });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/sistemaapi1/', formData);
      alert('Sistema creado con éxito');
    } catch (error: any) {
      console.error('Error al crear el sistema:', error.response?.data || error.message);
      alert('Error al crear el sistema. Revisa los datos e inténtalo nuevamente.');
    }
  };
  

  if (loading) return <p>Cargando jugadores y juegos...</p>;

  return (
    <div className="CreateSistema">
      <h1>Crear Sistema</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la Distribuidora:
          <input
            type="text"
            name="nombre_distribuidora"
            value={formData.nombre_distribuidora}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nombre de la Desarrolladora:
          <input
            type="text"
            name="nombre_desarrolladora"
            value={formData.nombre_desarrolladora}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descuento (%):
          <input
            type="number"
            name="descuento"
            value={formData.descuento}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </label>

        <label>
          Jugador:
          <select
            name="jugador"
            value={formData.jugador}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un jugador</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>
                {jugador.nombre} {jugador.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Juegos:
          <select
            name="juegos"
            multiple
            value={formData.juegos}
            onChange={handleChange}
            required
          >
            {juegos.map((juego) => (
              <option key={juego.id} value={juego.id}>
                {juego.nombre}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Crear Sistema</button>
      </form>
    </div>
  );
};

export default CrearSistema;
