import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ReservationTeren.css'; // Specifični stilovi za ovaj teren
import vanjskiTeren from '../assets/fuc3.webp';


function ReservationTeren2() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
  };

  // Funkcija koja blokira datume
  const disableDates = ({ date, view }) => {
    // Blokiramo prošle datume
    const today = new Date();
    
    // Definiramo zadnji dozvoljeni datum (mjesec dana od trenutnog dana)
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1); // Dodajemo 1 mjesec na trenutni datum

    // Blokiramo datume koji su u prošlosti i one izvan sljedećih mjesec dana
    return date < today || date > maxDate;
  };

  const handleSubmit = (timeSlot) => {
    alert(`Rezervacija na datum ${selectedDate.toLocaleDateString()} u terminu ${timeSlot}`);
  };

  return (
    <div className="reservation-page">
      <h1 className='reservation-title'>Rezervacija unutarnjeg terena 2</h1>
      <img src={vanjskiTeren} alt="Unutarnji teren" className="teren-image" />
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={disableDates} // Blokiramo određene datume
      />

      <h2>Dostupni termini za {selectedDate.toLocaleDateString()}:</h2>
      <ul>
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <li key={index}>
              <button onClick={() => handleSubmit(time)}>{time}</button>
            </li>
          ))
        ) : (
          <p>Nema dostupnih termina za ovaj datum.</p>
        )}
      </ul>
    </div>
  );
}

export default ReservationTeren2;