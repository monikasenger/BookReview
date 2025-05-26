import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserCircle, FaBookOpen, FaUserShield } from 'react-icons/fa'; // FaUserShield for admin icon
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Manage login status and username
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('Monika'); // Example username on login

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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
    setUsername(''); // Clear username on logout
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 via-cyan-700 to-teal-800 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-8 py-2 flex justify-between items-center">
        {/* Logo + Text */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="BookBuzz Logo" className="w-12 h-14 object-contain" />
          <span
            className="text-3xl font-extrabold tracking-wider select-none
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500
                       drop-shadow-lg
                       transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:drop-shadow-xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            BookBuzz
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-8 text-base font-semibold items-center relative">
          {/* Home, Books, and Admin Links */}
          {[
            { to: '/', label: 'Home', icon: FaHome },
            { to: '/books', label: 'Books', icon: FaBookOpen },
            { to: '/admin-login', label: 'Admin', icon: FaUserShield }, // Admin link added here
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center space-x-2
                transition-all duration-300 ease-in-out
                hover:text-yellow-300 hover:scale-110
                relative
                ${isActive(to) ? 'text-yellow-400' : 'text-white'}
              `}
            >
              <Icon className="text-lg" />
              <span>{label}</span>

              {/* Active bottom border */}
              {isActive(to) && (
                <span className="absolute -bottom-2 left-0 right-0 mx-auto w-6 h-0.5 bg-yellow-400 rounded"></span>
              )}
            </Link>
          ))}

          
            
        </nav>
      </div>
    </header>
  );
};

export default Header;
