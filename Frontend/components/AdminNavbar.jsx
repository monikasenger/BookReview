import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

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

  const booksRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (booksRef.current && !booksRef.current.contains(event.target)) {
        setIsBooksOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debug logs on click
  const toggleBooks = () => {
    console.log("Books dropdown toggle clicked");
    setIsBooksOpen((prev) => !prev);
  };

 

  return (
    <nav className="bg-indigo-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">📘 Admin Panel</div>

      <div className="flex space-x-6 items-center relative">
        {/* Books Dropdown */}
        <div ref={booksRef} className="relative cursor-pointer">
          {/* Changed span to button for better semantics */}
          <button
            onClick={toggleBooks}
            className="hover:text-indigo-300 select-none focus:outline-none"
            type="button"
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
    </nav>
  );
};

export default AdminNavbar;
