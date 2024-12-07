import React from 'react';
import { Link } from 'react-router-dom';
import "../css/index.css"

const Index: React.FC = () => {
  return (
    <div className="Index">
      <h1>Bienvenido a la API de Gestión de Juegos</h1>
      <p>
        Esta aplicación es una demostración de una API desarrollada con{' '}
        <strong>React</strong> para el frontend y <strong>Django</strong> para el backend.
        Aquí puedes gestionar una lista de videojuegos: crear, ver, actualizar y eliminar registros.
      </p>
      <p>
        La aplicación consume una API REST creada con Django, que permite la comunicación eficiente entre el frontend y el servidor.
      </p>
      <p>
        Explora las funcionalidades a través de las siguientes opciones:
      </p>

      <div className="button-group">
        <Link to="/crear-juego">
          <button>Crear Juego</button>
        </Link>
        <Link to="/Lista-juego">
          <button>Lista de Juegos</button>
        </Link>
        <Link to="/crear-jugador">
          <button>Crear Jugador</button>
        </Link>
        <Link to="/Lista-jugador">
          <button>Lista de Jugadores</button>
        </Link>
        <Link to="/crear-sistema">
          <button>Crear Sistema</button>
        </Link>
        <Link to="/Lista-sistema">
          <button>Lista de Sistemas</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
