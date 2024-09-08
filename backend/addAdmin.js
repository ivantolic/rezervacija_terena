const admin = require('firebase-admin');

// Učitaj Firebase konfiguraciju
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const addAdminRole = async (userId) => {
  try {
    // Postavi custom claim 'admin' za korisnika
    await admin.auth().setCustomUserClaims(userId, { admin: true });
    console.log(`Korisniku ${userId} su dodane administratorske ovlasti.`);
  } catch (error) {
    console.error('Greška prilikom dodavanja administratorskih ovlasti:', error);
  }
};

// Ovdje moraš staviti ID korisnika kojemu želiš dodati adminsitratorske ovlasti
const userId = 'TWj9w1yoIuOCFUr0Jf9293iRDP23';

addAdminRole(userId);
