import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';


function Home() {
  return (
    <div className="container-home">
      <div className="row">

        <div className="col">
          <h1 className='home-naslov'>FUC</h1>
          <p style={{ fontSize: '20px', paddingTop: '5px' }}>
            Želite se zabaviti sa svojom ekipom na našim novoizgrađenim terenima? <br />
            Rezervirajte svoj termin odmah sada!
          </p>
          <Link to="/rezervacija"><button className="rezerviraj_button" type="button">Rezerviraj</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
