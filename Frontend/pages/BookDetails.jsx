import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import { books } from '../assets/bookasset';  // आपका books data array

const BookDetails = () => {
  const { id } = useParams();  // URL से book id लेना
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const foundBook = books.find(b => b._id === id);
    setBook(foundBook);
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
        <button
          onClick={() => navigate('/books')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Books
        </button>
      </div>
    );
  }

  const rating = parseFloat(book.rating) || 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-8 my-8">
      <button
        onClick={() => navigate('/books')}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ← Back to Books
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
    <img
  src={book.cover}
  alt={book.title}
  className="w-4/5 md:w-1/2 h-auto object-cover rounded"
/>



        {/* Book Info */}
        <div className="md:w-2/3 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>

          <p className="text-gray-700 mb-2">
            <strong>Authors:</strong> {book.authorsToLookFor?.join(', ') || 'Unknown'}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Genre:</strong> {book.genre}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Year:</strong> {book.year}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> ₹{book.price}
          </p>

          {/* Rating */}
          {rating > 0 ? (
            <div className="flex items-center space-x-3 mt-4">
              <strong className="text-blue-600 font-semibold">Rating:</strong>
              <RatingStars rating={rating} />
              <span className="text-blue-600 font-semibold">{rating.toFixed(1)} / 5</span>
            </div>
          ) : (
            <p className="text-red-500 italic mt-4">Rating Not Available</p>
          )}

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
          </div>

          {/* Reading Suggestions */}
          {book.readingSuggestions && book.readingSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">Reading Suggestions</h3>
              <ul className="list-disc list-inside text-gray-700">
                {book.readingSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
