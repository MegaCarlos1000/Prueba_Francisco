import React from 'react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="Index">
      <h1>Bienvenido</h1>
      <p>Selecciona una opción:</p>
      <Link to="/crear-juego">
        <button>Crear Juego</button>
      </Link>
      <Link to="/Lista-juego">
        <button>Lista Juego</button>
      </Link>
      {/* Agrega más botones aquí si es necesario */}
    </div>
  );
};

export default Index;
