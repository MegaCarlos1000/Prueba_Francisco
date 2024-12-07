import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Gestión de Juegos</h1>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/crear-juego">Crear Juego</Link>
        </li>
        <li>
          <Link to="/Lista-juego">Lista de Juegos</Link>
        </li>
        <li>
          <Link to="/crear-jugador">Crear Jugador</Link>
        </li>
        <li>
          <Link to="/Lista-Jugador">Lista Jugador</Link>
        </li>
        <li>
          <Link to="/crear-Sistema">Crear Sistema</Link>
        </li>
        <li>
          <Link to="/Lista-sistema">Lista Sistema</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
