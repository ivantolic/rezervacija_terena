import React from 'react';
import { Link } from 'react-router-dom';
import unutarnjiTeren from '../assets/fuc1.jpg'; // Slike terena
import vanjskiTeren1 from '../assets/fuc2.webp';
import vanjskiTeren2 from '../assets/fuc3.webp';
import '../styles/Reservation.css'; // Vanjski CSS za stilizaciju

function Reservation() {
  return (
    <div className="flexbox-container">
      <div className="teren1">
        <p className="teren1_naslov">Unutarnji teren</p>
        <img src={unutarnjiTeren} className="unutarnji" alt="Unutarnji teren" />
        <Link to="/rezervacija-teren1" style={{ textDecoration: 'none' }}>
          <button className="rezerviraj">Rezerviraj</button>
        </Link>
      </div>
      <div className="teren2">
        <p className="teren2_naslov">Unutarnji teren 2</p>
        <img src={vanjskiTeren2} className="vanjski1" alt="Vanjski teren 1" />
        <Link to="/rezervacija-teren2" style={{ textDecoration: 'none' }}>
          <button className="rezerviraj">Rezerviraj</button>
        </Link>
      </div>
      <div className="teren3">
        <p className="teren3_naslov">Vanjski teren</p>
        <img src={vanjskiTeren1} className="vanjski2" alt="Vanjski teren 2" />
        <Link to="/rezervacija-teren3" style={{ textDecoration: 'none' }}>
          <button className="rezerviraj">Rezerviraj</button>
        </Link>
      </div>
    </div>
  );
}

export default Reservation;
