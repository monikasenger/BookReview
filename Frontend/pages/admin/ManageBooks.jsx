import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../../context/BookContext";
import { Link, useNavigate } from "react-router-dom"; // <-- Import useNavigate
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const { books, getAllBooks, aToken, setBooks } = useContext(BookContext);
  const [localBooks, setLocalBooks] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate(); // <-- Initialize navigate here

  useEffect(() => {
    getAllBooks(); // fetch books on mount
  }, []);

  useEffect(() => {
    setLocalBooks(books); // sync context books to local state
  }, [books]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      setLoadingDelete(true);
      const { data } = await axios.delete(`${backendUrl}/api/admin/books/${id}`, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success("Book deleted successfully");
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
        setLocalBooks(updatedBooks);
      } else {
        toast.error(data.message || "Failed to delete book");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting book");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

        <Link
          to="/admin-dashboard/add-book"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded mb-8"
        >
          + Add New Book
        </Link>

        {localBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {localBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={book.cover || "/default-cover.jpg"}
                  alt={book.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {book.genre}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-3 flex-grow">
                    {book.description}
                  </p>

                  {Array.isArray(book.readingSuggestions) && book.readingSuggestions.length > 0 && (
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Reading Suggestions:
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {book.readingSuggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(book.authorsToLookFor) && book.authorsToLookFor.length > 0 && (
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Authors to look for:
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {book.authorsToLookFor.join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-700 font-medium">
                    <span>Year: {book.year}</span>
                    <span>Price: ₹{book.price}</span>
                    <span>⭐ {book.rating?.toFixed(1)}</span>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => navigate(`/admin-dashboard/edit-book/${book._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={loadingDelete}
                      className={`flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded ${
                        loadingDelete ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loadingDelete ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageBooks;
