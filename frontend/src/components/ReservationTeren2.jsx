import React, { useState, useEffect } from 'react';
import '../styles/ReservationTeren.css'; 
import unutarnjiTeren2 from '../assets/fuc3.webp'; 
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ReservationTeren2() {
  const [selectedDay, setSelectedDay] = useState(null); 
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]); 
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserId(user.uid); 
    } else {
      setErrorMessage("Morate biti prijavljeni da biste rezervirali teren.");
      setTimeout(() => {
        navigate('/login'); 
      }, 3000);
    }

    if (selectedDay) {
      fetchReservedTimes(selectedDay); 
    }
  }, [selectedDay, navigate]);

  const fetchReservedTimes = async (day) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rezervacije?terenId=field2&day=${day}`);
      const reserved = response.data.map(reservation => ({
        timeSlot: reservation.vrijeme.trim(), 
        day: reservation.dan.trim() 
      }));
      setReservedTimes(reserved); 
    } catch (error) {
      console.error("Greška prilikom dohvaćanja rezervacija:", error);
    }
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day); 
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
    fetchReservedTimes(day); 
  };

  const handleSubmit = async (timeSlot) => {
    if (!userId) {
      alert("Korisnik nije prijavljen.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/rezerviraj', {
        userId: userId,
        terenId: "field2",
        day: selectedDay,
        timeSlot: timeSlot,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert(response.data.message);

      fetchReservedTimes(selectedDay); 
    } catch (error) {
      console.error("Greška prilikom rezervacije:", error);
    }
  };

  
  return (
    <div className="reservation-page">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <h1 className='reservation-title'>Rezervacija unutarnjeg terena 2</h1>
          <img src={unutarnjiTeren2} alt="Unutarnji teren" className="teren-image" />

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

export default ReservationTeren2;
