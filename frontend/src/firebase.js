import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDblrSjx-emH7aE_xdPDES995_GUKVp7g0",
  authDomain: "rezervacija-terena.firebaseapp.com",
  projectId: "rezervacija-terena",
  storageBucket: "rezervacija-terena.appspot.com",
  messagingSenderId: "818460259568",
  appId: "1:818460259568:web:49478ac0f8a10453103e35"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database

export { auth, db };
