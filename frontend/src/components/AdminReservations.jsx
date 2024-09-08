import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase'; 
import '../styles/AdminReservations.css'; 

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcija za dohvaćanje svih rezervacija
  const fetchReservations = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // Dohvati ID token korisnika

        const response = await axios.get('http://localhost:5000/api/admin/rezervacije', {
          headers: {
            Authorization: `Bearer ${token}` // Dodaj token u zaglavlje
          }
        });
        
        setReservations(response.data); // Postavi rezervacije u state
        setLoading(false);
      } else {
        setError('Niste prijavljeni.');
        setLoading(false);
      }
    } catch (error) {
      setError('Greška prilikom dohvaćanja rezervacija.');
      setLoading(false);
    }
  };

  // Funkcija za brisanje rezervacije
  const deleteReservation = async (id) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // Dohvati ID token korisnika

        await axios.delete(`http://localhost:5000/api/admin/rezervacija/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Dodaj token u zaglavlje za brisanje
          }
        });

        // Filtriraj izbrisanu rezervaciju iz liste
        setReservations(reservations.filter(reservation => reservation.id !== id));
      }
    } catch (error) {
      setError('Greška prilikom brisanja rezervacije.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <p>Učitavanje rezervacija...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-reservations">
      <h1>Popis rezervacija</h1>
      {reservations.length === 0 ? (
        <p>Nema rezervacija.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-item">
              <div className="reservation-info">
                <p><strong>Teren:</strong> {reservation.terenId}</p>
                <p><strong>Dan:</strong> {reservation.dan}</p>
                <p><strong>Vrijeme:</strong> {reservation.vrijeme}</p>
              </div>
              <div className="reservation-actions">
                <button onClick={() => deleteReservation(reservation.id)} className="delete-button">
                  Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminReservations;
