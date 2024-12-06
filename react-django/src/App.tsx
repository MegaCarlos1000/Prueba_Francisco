import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CrearJuego from './pages/CrearJuego';
import ListaJuego from './pages/ListaJuegos';
import ActualizarJuego from './pages/ActualizarJuego';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/crear-juego" element={<CrearJuego />} />
        <Route path="/Lista-juego" element={<ListaJuego />} />
        <Route path="/Actualizar-juego/:id" element={<ActualizarJuego />} />
      </Routes>
    </Router>
  );
};

export default App;
