const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Funkcija za dodjeljivanje administratorske uloge
const addAdminRole = async (userId) => {
  try {
    // Postavljanje custom claim-a za korisnika
    await admin.auth().setCustomUserClaims(userId, { admin: true });
    console.log(`Uloga administratora uspješno dodijeljena korisniku: ${userId}`);

    // Opciono: možeš dodati podatke u bazu za praćenje admina
    const userRef = db.collection('korisnici').doc(userId);
    await userRef.set({
      role: 'admin'
    }, { merge: true }); // merge: true zadržava ostale podatke ako već postoji dokument

    console.log(`Podaci o ulozi ažurirani u Firestore za korisnika: ${userId}`);
  } catch (error) {
    console.error("Greška prilikom dodjeljivanja administratorske uloge:", error);
    throw new Error('Neuspješno dodjeljivanje administratorske uloge');
  }
};

// Funkcija za provjeru je li korisnik admin
const checkIfAdmin = async (req, res, next) => {
  const userToken = req.headers.authorization;

  if (!userToken) {
    return res.status(403).json({ message: 'Nedostaje token za autorizaciju.' });
  }

  try {
    // Verifikacija tokena
    const decodedToken = await admin.auth().verifyIdToken(userToken.replace('Bearer ', ''));
    if (decodedToken.admin) {
      req.user = decodedToken; // dodaj usera u request objekt
      next(); // Nastavi na sljedeći middleware ili rutu
    } else {
      return res.status(403).json({ message: 'Pristup odbijen. Niste administrator.' });
    }
  } catch (error) {
    console.error("Greška prilikom provjere administratorskih prava:", error);
    return res.status(403).json({ message: 'Neispravan token.' });
  }
};

module.exports = { db, addAdminRole, checkIfAdmin };
