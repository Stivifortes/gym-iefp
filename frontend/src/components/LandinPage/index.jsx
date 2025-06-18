import React from 'react';
import './style.css';
import logo from '../../assets/HeaderLogo.png';
import clipboard from '../../assets/clipboard.png';

function LandingPage() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Gym App Logo" className="logo" />
        </div>
        <div className="nav-container">
          <nav className="nav">
             <a href="#" className="nav-link">Home</a>
             <a href="#" className="nav-link">Serviços</a>
            <a href="#" className="nav-link">Sobre</a>
          </nav>
          <button className="login-button">Log In</button>
        </div>
        
      </header>

      <main className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Shape Your Body<br />With Gym App</h1>
          <p className="hero-subtitle">
            Transforme seu corpo, desafie seus limites<br />
            comece hoje sua jornada rumo à melhor<br />
            versão de si mesmo!
          </p>
          <div className="hero-buttons">
            <button className="signup-button">Inscrever</button>
            <button className="plans-button">Ver Planos</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={clipboard} alt="Muscular Man" className="muscular-man" />
        </div>
      </main>
    </div>
  );
}

export default LandingPage;