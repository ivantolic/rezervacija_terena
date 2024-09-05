import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/ReservationTeren.css'; // Specifični stilovi za ovaj teren
import unutarnjiTeren from '../assets/fuc1.jpg'; // Slike terena


function ReservationTeren1() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const availableSlots = [
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
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
      <h1>Rezervacija unutarnjeg terena 1</h1>
      <img src={unutarnjiTeren} alt="Unutarnji teren" className="teren-image" />
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

export default ReservationTeren1;