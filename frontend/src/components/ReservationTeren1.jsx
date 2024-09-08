import React, { useState, useEffect } from 'react';
import '../styles/ReservationTeren.css'; 
import unutarnjiTeren from '../assets/fuc1.jpg'; 
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ReservationTeren1() {
  const [selectedDay, setSelectedDay] = useState(null); 
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]); // Lista rezerviranih termina
  const [userId, setUserId] = useState(null); // Drzimo uid
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // React router funkcija za preusmjeravanje

  // Dohvati korisnika iz Firebase Authenticationa
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserId(user.uid); // Postavi korisnikov UID
    } else {
      setErrorMessage("Morate biti prijavljeni da biste rezervirali teren.");
      setTimeout(() => {
        navigate('/login'); // Preusmjeravanje na login stranicu nakon 3 sekunde
      }, 3000);
    }
  }, [navigate]);

  // Funkcija za dohvacanje rezerviranih termina iz baze podataka
  const fetchReservedTimes = async (day) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rezervacije?terenId=field1&day=${day}`);
      
      // Ispis podataka iz odgovora da vidimo tocne vrijednosti iz baze
      console.log("Dohvaćeni rezervirani termini:", response.data);

      const reserved = response.data.map(reservation => ({
        timeSlot: reservation.vrijeme.trim(), 
        day: reservation.dan.trim() 
      }));
      setReservedTimes(reserved); // Postavi rezervirane termine u state
    } catch (error) {
      console.error("Greška prilikom dohvaćanja rezervacija:", error);
    }
  };

  // Funkcija koja se poziva kada korisnik odabere dan
  const handleDaySelection = (day) => {
    setSelectedDay(day); // Postavi odabrani dan
    const availableSlots = [
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00',
      '20:00 - 21:00',
      '21:00 - 22:00',
      '22:00 - 23:00',
      '23:00 - 24:00',
    ];
    setAvailableTimes(availableSlots);
    fetchReservedTimes(day); // Dohvati rezervirane termine za odabrani dan
  };

  // Funkcija za rezervaciju termina
  const handleSubmit = async (timeSlot) => {
    if (!userId) {
      alert("Korisnik nije prijavljen.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/rezerviraj', {
        userId: userId,
        terenId: "field1",
        day: selectedDay,
        timeSlot: timeSlot,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert(response.data.message);

      // Nakon uspjesne rezervacije blokiraj rezervirani termin
      fetchReservedTimes(selectedDay);  // Ponovno dohvatimo rezervacije da se frontend azurira
    } catch (error) {
      console.error("Greška prilikom rezervacije:", error);
    }
  };

  // Ako je korisnik prijavljen prikazujemo rezervacije
  return (
    <div className="reservation-page">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <h1 className='reservation-title'>Rezervacija unutarnjeg terena 1</h1>
          <img src={unutarnjiTeren} alt="Unutarnji teren" className="teren-image" />
          
          <h2>Odaberite dan u tjednu:</h2>
          <div className="days-container">
            {['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'].map((day, index) => (
              <button
                key={index}
                onClick={() => handleDaySelection(day)}
                className="day-button"
              >
                {day}
              </button>
            ))}
          </div>

          {selectedDay && (
            <>
              <h2>Dostupni termini za {selectedDay}:</h2>
              <ul>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSubmit(time)}
                        // Blokiraj termine koji su vec rezervirani za ovaj dan
                        disabled={reservedTimes.some(reserved => reserved.timeSlot === time && reserved.day === selectedDay)}
                        className={reservedTimes.some(reserved => reserved.timeSlot === time && reserved.day === selectedDay)
                          ? 'time-button disabled' : 'time-button'}
                      >
                        {time}
                      </button>
                    </li>
                  ))
                ) : (
                  <p>Nema dostupnih termina za ovaj dan.</p>
                )}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationTeren1;
