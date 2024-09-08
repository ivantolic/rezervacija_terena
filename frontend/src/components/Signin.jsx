import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase'; // Firebase Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import '../styles/Signin.css';

function Signin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      alert('Email mora sadržavati znak @.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Lozinke se ne podudaraju.');
      return;
    }
    if (email === '' || password === '' || username === '') {
      alert('Popunite sva polja.');
      return;
    }

    try {
      // Kreiraj novog korisnika koristeci Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Spremi korisnika u Firestore nakon uspjesne registracije
      await saveUserToFirestore(user);

      console.log('Korisnik registriran:', user);
      alert('Uspješno ste registrirani!');
    } catch (error) {
      console.error('Greška prilikom registracije:', error.message);
      alert('Greška prilikom registracije: ' + error.message);
    }
  };

  // Funkcija za spremanje korisnika u Firestore
  const saveUserToFirestore = async (user) => {
    try {
      await addDoc(collection(db, 'korisnici'), {
        uid: user.uid,
        email: user.email,
        username: username, // Korisnicko ime iz state-a
        role: 'user', // Default role za korisnika
      });
      console.log('Korisnik uspješno spremljen u Firestore.');
    } catch (error) {
      console.error('Greška prilikom spremanja korisnika:', error);
    }
  };

  return (
    <div className="container-signin">
      <h1>Registriraj se</h1>
      <p>Molimo vas popunite predviđena polja <br />kako biste kreirali račun.</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username"><b>Korisničko ime</b></label>
        <input
          type="text"
          placeholder="Unesite korisničko ime"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email"><b>E-mail</b></label>
        <input
          type="text"
          placeholder="Unesite e-mail"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // HTML validacija
          required
        />

        <label htmlFor="password"><b>Lozinka</b></label>
        <input
          type="password"
          placeholder="Unesite lozinku"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword"><b>Ponovite lozinku</b></label>
        <input
          type="password"
          placeholder="Ponovite lozinku"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <hr />
        <button type="submit" className="submitButton">Registriraj se</button>
      </form>
      <div className="signin">
        <p className="signin-content">Imate račun? <a href="/login">Prijavi se</a>.</p>
      </div>
    </div>
  );
}

export default Signin;
