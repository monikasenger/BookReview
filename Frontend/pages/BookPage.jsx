import React, { useEffect, useState } from 'react';
import { books } from '../assets/bookasset';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

const BookPage = () => {
  const [booksList, setBooksList] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'fiction', 'non-fiction'
  const navigate = useNavigate();

  useEffect(() => {
    setBooksList(books);
    setFilteredBooks(books);
  }, []);

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === 'all') {
      setFilteredBooks(booksList);
    } else if (type === 'fiction') {
      setFilteredBooks(booksList.filter(book => book.genre.toLowerCase() === 'fiction'));
    } else if (type === 'non-fiction') {
      setFilteredBooks(booksList.filter(book => book.genre.toLowerCase() === 'non-fiction'));
    }
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
          <button
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'fiction' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('fiction')}
          >
            Fiction
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'non-fiction' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('non-fiction')}
          >
            Non-Fiction
          </button>
        </div>

        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((books) => (
              <div key={books._id} className="flex flex-col">
                <BookCard book={books} />
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
