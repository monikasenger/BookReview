import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleMoreDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const rating = parseFloat(book.rating) || 0;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Genre:</strong> {book.genre}
        </p>

        

        <p className="text-lg font-bold text-indigo-600 mb-4">
          Price: ₹{book.price}
        </p>

{/*ratig review*/}
    {rating > 0 ? (
  <div className="mt-auto flex items-center space-x-3">
    <strong className="text-blue-600 font-semibold">Rating:</strong>
    <RatingStars rating={rating} />
    <span className="text-yellow-600 font-semibold">{rating.toFixed(1)} / 5</span>
  </div>
) : (
  <p className="mt-auto text-red-500 italic">Rating Not Available</p>
)}


        <button
          onClick={() => handleMoreDetails(book._id)}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition self-center"
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;

