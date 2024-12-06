import React from 'react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="Index">
      <h1>Bienvenido</h1>
      <p>Selecciona una opción:</p>
      <Link to="/create-game">
        <button>Crear Juego</button>
      </Link>
      {/* Agrega más botones aquí si es necesario */}
    </div>
  );
};

export default Index;
