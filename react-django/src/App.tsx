import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CreateGame from './pages/CreateGame';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
    </Router>
  );
};

export default App;
