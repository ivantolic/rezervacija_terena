import React, { useState } from 'react';
import { auth } from '../firebase';  // Ispravna putanja nakon što premjestiš datoteku
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Provjera emaila
    if (!email.includes('@')) {
      alert('Email mora sadržavati znak @.');
      return;
    }
    // Provjera da sva polja budu popunjena
    if (email === '' || password === '') {
      alert('Popunite sva polja.');
      return;
    }

    try {
      // Prijava korisnika s Firebase autentifikacijom
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Korisnik prijavljen:', userCredential.user);
      alert('Uspješno ste prijavljeni!');
      
      // Preusmjeravanje korisnika nakon uspjesne prijave
      window.location.href = "/"; 
    } catch (error) {
      console.error('Greška prilikom prijave:', error.message);
      alert('Greška prilikom prijave: ' + error.message);
    }
  };

  return (
    <div className="container-login">
      <h1>Prijavi se</h1>
      <p>Molimo vas popunite predviđena polja <br /> kako biste se prijavili.</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"><b>E-mail</b></label>
        <input
          type="text"
          placeholder="Unesite e-mail"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // html validacija
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
        <hr />
        <button type="submit" className="submitButton">Prijavi se</button>
      </form>
      <div className="signin">
        <p className="signin-content">Nemate račun? <a href="/signin">Registriraj se</a>.</p>
      </div>
    </div>
  );
}

export default Login;
