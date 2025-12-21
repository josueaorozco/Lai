import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-box">
        <span className="logo-text">LAI</span>
      </div>

      <nav className="menu">
        <Link to="/">Accueil</Link>
        <Link to="/mission">Mission</Link>
        <Link to="/activites">Activités</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}
