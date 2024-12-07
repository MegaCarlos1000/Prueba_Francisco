import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CrearJuego from './pages/CrearJuego';
import ListaJuego from './pages/ListaJuegos';
import ActualizarJuego from './pages/ActualizarJuego';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CrearJugador from './pages/CrearJugador';
import ListaJugador from './pages/ListaJugador';
import ActualizarJugador from './pages/ActualizarJugador';
import CrearSistema from './pages/CrearSistema';
import ListaSistema from './pages/ListaSistema';
import ActualizarSistema from './pages/ActualizarSistema';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main> {/* Este contenedor ayuda a empujar el footer hacia abajo */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crear-juego" element={<CrearJuego />} />
          <Route path="/Lista-juego" element={<ListaJuego />} />
          <Route path="/Actualizar-juego/:id" element={<ActualizarJuego />} />
          <Route path="/crear-jugador" element={<CrearJugador />} />
          <Route path="/Lista-Jugador" element={<ListaJugador />} />
          <Route path="/Actualizar-jugador/:id" element={<ActualizarJugador />} />
          <Route path="/crear-sistema" element={<CrearSistema />} />
          <Route path="/Lista-sistema" element={<ListaSistema />} />
          <Route path="/Actualizar-sistema/:id" element={<ActualizarSistema />} />


        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
