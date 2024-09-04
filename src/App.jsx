import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer'; // Import 
import Header from './components/Header';
import Reservation from './components/Reservation';

function App() {
  return (
    <div className="app">
      <Header />
      {/* Glavni dio aplikacije sa rutama */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezervacija" element={<Reservation />} />
        {/* Ovdje možeš dodati više ruta */}
      </Routes>

      {/* Footer je ispod svih ruta */}
      <Footer />
    </div>
  );
}

export default App;
