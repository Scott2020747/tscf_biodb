import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/tscf-logo.png';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/register', label: 'Register' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="TSCF" className="navbar-logo" />
          <span className="text-white font-bold text-lg">TSCF Vision Partners</span>
        </div>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-white/30 text-white font-bold'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
