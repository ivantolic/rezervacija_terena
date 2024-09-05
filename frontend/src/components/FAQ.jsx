import React, { useState } from 'react';
import '../styles/FAQ.css';

function FAQ() {
  const [openSection, setOpenSection] = useState(null); // Praćenje koja je sekcija otvorena

  const toggleSection = (section) => {
    // Ako je kliknuta sekcija već otvorena, zatvori je
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section); // Inače, otvori kliknutu sekciju
    }
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Često postavljena pitanja</h1>
      <ul className="accordion">
        <li>
          <div className="faq-header" onClick={() => toggleSection(1)}>
            Zanima Vas više o nama?
          </div>
          {openSection === 1 && (
            <div className="content open">
              <p>
                FUC centar obuhvaća prostor na površini od 6200 m². <br />
                Vanjski dio centra obuhvaćaju dva malonogometna igrališta s umjetnom travom dimenzija 40 x 20 m s
                reflektorima i tribinama. <br />
                Unutarnji dio centra obuhvaća jedno malonogometno igralište s parketom dimenzija 40 x 20 m s
                pripadajućom tribinom za navijače. <br />
                Tereni su namijenjeni za rekreaciju.
              </p>
            </div>
          )}
        </li>
        <li>
          <div className="faq-header" onClick={() => toggleSection(2)}>
            Gdje se nalazimo?
          </div>
          {openSection === 2 && (
            <div className="content open">
              <p>
                Nalazimo se u Osijeku. <br />
                Adresa: Ulica nogometni tereni 47.
              </p>
            </div>
          )}
        </li>
        <li>
          <div className="faq-header" onClick={() => toggleSection(3)}>
            Kada možete rezervirati termin?
          </div>
          {openSection === 3 && (
            <div className="content open">
              <p>
                Termin možete rezervirati svaki dan u tjednu u okviru radnog vremena. <br />
                Radno vrijeme: 14-24.
              </p>
            </div>
          )}
        </li>
        <li>
          <div className="faq-header" onClick={() => toggleSection(4)}>
            Koja je cijena najma terena?
          </div>
          {openSection === 4 && (
            <div className="content open">
              <p>Cijena najma terena za 1h iznosi 20 &euro;.</p>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default FAQ;
