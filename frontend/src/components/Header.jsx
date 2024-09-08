import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoblack.png';
import '../styles/Header.css';
import { auth } from '../firebase.js'; 
import { signOut } from 'firebase/auth'; 

function Header({ user }) {
  const location = useLocation(); // Saznajemo trenutnu rutu
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State za kontrolu hamburger izbornika
  const [isAdmin, setIsAdmin] = useState(false); // Držimo status je li korisnik admin

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Funkcija za otvaranje i zatvaranje izbornika
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Uspješno ste se odjavili.');
      })
      .catch((error) => {
        console.error('Greška prilikom odjave:', error);
      });
  };

  // Provjeravamo ima li korisnik administratorske ovlasti
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin); // Postavi isAdmin na true ako korisnik ima administratorska prava
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="navbar">
      <img src={logo} className="logo" alt="logo" />

      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          
          {user ? (
            <>
              <li className="user-email">{user.email}</li>
              <li><button className="logout-button" onClick={handleLogout}>ODJAVI SE</button></li>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>PRIJAVI SE</Link></li>
              )}
              {location.pathname !== '/signin' && (
                <li><Link to="/signin" onClick={() => setIsMenuOpen(false)}>REGISTRIRAJ SE</Link></li>
              )}
            </>
          )}

          {location.pathname !== '/' && (
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>NASLOVNICA</Link></li>
          )}

          {location.pathname !== '/rezervacija' && (
            <li><Link to="/rezervacija" onClick={() => setIsMenuOpen(false)}>REZERVIRAJ</Link></li>
          )}

          <li><Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link></li>

          {isAdmin && (
            <li><Link to="/admin/rezervacije" onClick={() => setIsMenuOpen(false)}>ADMIN</Link></li>
          )}
        </ul>
      </nav>

      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;
