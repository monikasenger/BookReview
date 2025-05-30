import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserCircle, FaBookOpen, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('Monika');

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert('Logged out!');
    setIsLoggedIn(false);
    setUsername('');
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/books', label: 'Books', icon: FaBookOpen },
    { to: '/admin-login', label: 'Admin', icon: FaUserShield },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-800 via-cyan-700 to-teal-800 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="BookBuzz Logo" className="w-10 h-12 sm:w-12 sm:h-14 object-contain" />
          <span
            className="text-2xl sm:text-3xl font-extrabold tracking-wider select-none bg-clip-text text-transparent
                       bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 drop-shadow-lg hover:scale-105
                       hover:drop-shadow-xl transition-transform duration-300 ease-in-out"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            BookBuzz
          </span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-base font-semibold items-center">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center space-x-2 transition-all duration-300 ease-in-out
                hover:text-yellow-300 hover:scale-110 relative
                ${isActive(to) ? 'text-yellow-400' : 'text-white'}
              `}
            >
              <Icon className="text-lg" />
              <span>{label}</span>
              {isActive(to) && (
                <span className="absolute -bottom-2 left-0 right-0 mx-auto w-6 h-0.5 bg-yellow-400 rounded"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 text-white px-6 py-4 space-y-4">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-2 text-lg hover:text-yellow-300 ${
                isActive(to) ? 'text-yellow-400' : 'text-white'
              }`}
            >
              <Icon />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
