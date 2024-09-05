import React, { useState } from 'react';
import '../styles/signin.css';

function Signin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
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
    } else {
      alert('Prijava u tijeku');
      sendLoginDataToServer(username, email, password);
    }
  };

  const sendLoginDataToServer = (username, email, password) => {
    const url = ''; // URL za backend API

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
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
