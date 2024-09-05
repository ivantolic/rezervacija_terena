import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer'; 
import Header from './components/Header';
import Reservation from './components/Reservation';
import ReservationTeren1 from './components/ReservationTeren1'; // Komponenta za Teren 1
import ReservationTeren2 from './components/ReservationTeren2'; // Komponenta za Teren 2
import ReservationTeren3 from './components/ReservationTeren3'; // Komponenta za Teren 3
import FAQ from './components/FAQ';
import Login from './components/Login';
import Signin from './components/Signin';
function App() {
  return (
    <div className="app">
      <Header />
      
      {/* Glavni dio aplikacije sa rutama */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezervacija" element={<Reservation />} />  {/* Prikazuje izbor terena */}
        <Route path="/rezervacija-teren1" element={<ReservationTeren1 />} /> {/* Stranica za rezervaciju terena 1 */}
        <Route path="/rezervacija-teren2" element={<ReservationTeren2 />} /> {/* Stranica za rezervaciju terena 2 */}
        <Route path="/rezervacija-teren3" element={<ReservationTeren3 />} /> {/* Stranica za rezervaciju terena 3 */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
