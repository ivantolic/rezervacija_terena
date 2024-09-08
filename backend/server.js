const express = require('express');
const cors = require('cors');
const { db, checkIfAdmin } = require('./firebase'); // Uvezi Firebase Firestore konfiguraciju i provjeru administratora

const app = express();

// Middleware za parsiranje JSON podataka
app.use(cors());
app.use(express.json()); // Ovaj middleware parsira JSON iz body-a zahtjeva

// API ruta za rezervaciju
app.post('/api/rezerviraj', async (req, res) => {
  const { userId, terenId, day, timeSlot } = req.body;

  if (!userId || !terenId || !day || !timeSlot) {
    return res.status(400).json({ message: "Nedostaju podaci za rezervaciju." });
  }

  try {
    const rezervacijeRef = db.collection('rezervacije');
    const querySnapshot = await rezervacijeRef
      .where('terenId', '==', terenId)
      .where('dan', '==', day)
      .where('vrijeme', '==', timeSlot)
      .get();

    if (!querySnapshot.empty) {
      return res.status(400).json({ message: "Teren je već rezerviran za ovaj termin i dan." });
    }

    await rezervacijeRef.add({
      userId,
      terenId,
      dan: day,
      vrijeme: timeSlot,
      status: "confirmed",
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Rezervacija uspješno kreirana." });
  } catch (error) {
    console.error("Greška prilikom rezervacije:", error);
    res.status(500).json({ message: "Došlo je do greške prilikom rezervacije." });
  }
});

// API ruta za dohvaćanje rezervacija po danu i terenu
app.get('/api/rezervacije', async (req, res) => {
  const { terenId, day } = req.query;

  try {
    const rezervacijeRef = db.collection('rezervacije');
    const querySnapshot = await rezervacijeRef
      .where('terenId', '==', terenId)
      .where('dan', '==', day)
      .get();

    const rezervacije = querySnapshot.docs.map(doc => doc.data());
    res.status(200).json(rezervacije);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
    res.status(500).json({ message: "Došlo je do greške prilikom dohvaćanja rezervacija." });
  }
});

// *** Dodane rute za administratora ***

// Ruta za dohvaćanje svih rezervacija (samo za administratore)
app.get('/api/admin/rezervacije', checkIfAdmin, async (req, res) => {
  try {
    const rezervacijeRef = db.collection('rezervacije');
    const querySnapshot = await rezervacijeRef.get();

    const rezervacije = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(rezervacije);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
    res.status(500).json({ message: "Došlo je do greške prilikom dohvaćanja rezervacija." });
  }
});

// Ruta za brisanje rezervacije (samo za administratore)
app.delete('/api/admin/rezervacija/:id', checkIfAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const rezervacijaRef = db.collection('rezervacije').doc(id);
    await rezervacijaRef.delete();
    res.status(200).json({ message: "Rezervacija uspješno obrisana." });
  } catch (error) {
    console.error("Greška prilikom brisanja rezervacije:", error);
    res.status(500).json({ message: "Došlo je do greške prilikom brisanja rezervacije." });
  }
});

// Postavi Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
