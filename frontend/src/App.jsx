import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer'; 
import Header from './components/Header';
import Reservation from './components/Reservation';
import ReservationTeren1 from './components/ReservationTeren1';
import ReservationTeren2 from './components/ReservationTeren2';
import ReservationTeren3 from './components/ReservationTeren3';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Signin from './components/Signin';
import AdminReservations from './components/AdminReservations';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Drzimo status admina

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        // Provjera ima li korisnik admin ovlasti
        const token = await user.getIdTokenResult();
        if (token.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div className="app">
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezervacija" element={<Reservation />} />
        <Route path="/rezervacija-teren1" element={<ReservationTeren1 />} />
        <Route path="/rezervacija-teren2" element={<ReservationTeren2 />} />
        <Route path="/rezervacija-teren3" element={<ReservationTeren3 />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin ruta koja je dostupna samo za administratore */}
        {isAdmin ? (
          <Route path="/admin/rezervacije" element={<AdminReservations />} />
        ) : (
          <Route path="/admin/rezervacije" element={<Navigate to="/" />} /> // Preusmjeravanje usera
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
