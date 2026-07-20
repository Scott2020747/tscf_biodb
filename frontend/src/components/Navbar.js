import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/tscf-logo.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/register', label: 'Register' },
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
          
          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/dashboard')
                    ? 'bg-green-500/30 text-white font-bold'
                    : 'text-green-400 hover:bg-green-500/20 hover:text-green-300'
                }`}
              >
                📊 Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg transition-all duration-200 text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-lg transition-all duration-200 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
            >
              🔐 Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
