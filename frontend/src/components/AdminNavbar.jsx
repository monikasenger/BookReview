import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminNavbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setAToken("");
      localStorage.removeItem("aToken");
      navigate("/");
    }
  };

  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const booksRef = useRef(null);

  const toggleBooks = () => setIsBooksOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (booksRef.current && !booksRef.current.contains(event.target)) {
        setIsBooksOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-indigo-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">📘 Admin Panel</div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <div ref={booksRef} className="relative">
            <button
              onClick={toggleBooks}
              className="hover:text-indigo-300 select-none focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isBooksOpen}
            >
              📚 Books ▾
            </button>

            {isBooksOpen && (
              <div className="absolute top-full left-0 bg-white text-black shadow-md mt-2 rounded z-50 w-40">
                <Link
                  to="/admin-dashboard/add-book"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => setIsBooksOpen(false)}
                >
                  ➕ Add Book
                </Link>
                <Link
                  to="/admin-dashboard/manage-books"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => setIsBooksOpen(false)}
                >
                  ✏️ Manage Books
                </Link>
                <Link
                  to="/admin-dashboard/review"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => setIsBooksOpen(false)}
                >
                  📝 Reviews
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <div ref={booksRef} className="relative">
            <button
              onClick={toggleBooks}
              className="w-full text-left px-2 py-1 hover:text-indigo-300"
            >
              📚 Books ▾
            </button>
            {isBooksOpen && (
              <div className="bg-white text-black shadow-md rounded w-full mt-1">
                <Link
                  to="/admin-dashboard/add-book"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => {
                    setIsBooksOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  ➕ Add Book
                </Link>
                <Link
                  to="/admin-dashboard/manage-books"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => {
                    setIsBooksOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  ✏️ Manage Books
                </Link>
                <Link
                  to="/admin-dashboard/review"
                  className="block px-4 py-2 hover:bg-indigo-100"
                  onClick={() => {
                    setIsBooksOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  📝 Reviews
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full text-left"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
