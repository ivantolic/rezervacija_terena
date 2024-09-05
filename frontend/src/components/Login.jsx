import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Email mora sadržavati znak @.');
      return;
    }
    if (email === '' || password === '') {
      alert('Popunite sva polja.');
    } else {
      alert('Prijava u tijeku');
      sendLoginDataToServer(email, password);
    }
  };

  const sendLoginDataToServer = (email, password) => {
    // Ovdje ide logika za slanje podataka na server
    const url = ''; // URL za backend API

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Uspješno ste prijavljeni!');
        } else {
          alert('Neuspješna prijava. Provjerite svoje podatke.');
        }
      })
      .catch((error) => {
        console.error('Greška prilikom slanja podataka na poslužitelj:', error);
      });
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
