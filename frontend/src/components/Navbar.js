import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tscf-logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        <div className="navbar-brand">

          <img
            src={logo}
            alt="TSCF Logo"
            className="navbar-logo"
          />

          <div>
            <h2>TSCF Vision Partners</h2>
            <p>Salt & Light</p>
          </div>

        </div>

        <div className="navbar-links">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/register">Register</Link>

          <Link to="/contact">Contact</Link>

        </div>

      </div>

    </nav>
  );
}
