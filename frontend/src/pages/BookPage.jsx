import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { BookContext } from '../context/BookContext';

const BookPage = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'fiction', 'non-fiction'
  const { getAllBooks, books } = useContext(BookContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks(); // this should set books in context
  }, []);

  useEffect(() => {
    // Apply filter when books or filter changes
    if (filter === 'all') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.genre.toLowerCase() === filter.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  }, [books, filter]);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBackClick}
          className="mb-8 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          All Books 📚
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {['all', 'fiction', 'non-fiction'].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-4 py-2 rounded ${
                filter === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
