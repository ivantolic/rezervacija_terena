import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoblack.png';
import '../styles/Header.css';

function Header() {
  const location = useLocation(); // Saznajemo trenutnu rutu
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State za kontrolu hamburger izbornika

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Funkcija za otvaranje/zatvaranje izbornika
  };

  return (
    <header className="navbar">
      <img src={logo} className="logo" alt="logo" />

      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {/* Ako nismo na stranici "Početna", prikazujemo link na Početnu stranicu */}
          {location.pathname !== '/' && (
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>NASLOVNICA</Link></li>
          )}

          {/* Ako nismo na stranici "Rezervacija", prikazujemo link */}
          {location.pathname !== '/rezervacija' && (
            <li><Link to="/rezervacija" onClick={() => setIsMenuOpen(false)}>REZERVIRAJ</Link></li>
          )}

          {/* Ako nismo na stranici "Login", prikazujemo link */}
          {location.pathname !== '/login' && (
            <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>PRIJAVI SE</Link></li>
          )}

          {/* Ako nismo na stranici "Signin", prikazujemo link */}
          {location.pathname !== '/signin' && (
            <li><Link to="/signin" onClick={() => setIsMenuOpen(false)}>REGISTRIRAJ SE</Link></li>
          )}

          {/* Link na FAQ je uvijek prikazan */}
          <li><Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link></li>
        </ul>
      </nav>

      {/* Hamburger ikona */}
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;
