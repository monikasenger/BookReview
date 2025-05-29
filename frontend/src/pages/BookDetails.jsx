import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import { BookContext } from '../context/BookContext';
import { AdminContext } from '../context/AdminContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    books,
    getAllBooks,
    getReviewsForBook,
    reviewByBook,
    loading,
  } = useContext(BookContext);
  const { backendUrl } = useContext(AdminContext);

  const [book, setBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(true);

  // Fetch books and book-specific reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllBooks();
        await getReviewsForBook(id);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setBookLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Set the book when books are loaded
  useEffect(() => {
    if (!bookLoading && books.length > 0) {
      const foundBook = books.find(b => b._id === id);
      setBook(foundBook || null);
    }
  }, [bookLoading, books, id]);

  if (bookLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading book details...</p>
      </div>
    );
  }

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
    <div className="max-w-6xl mx-auto bg-white rounded shadow p-8 my-8">
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
          className="w-full md:w-1/3 h-auto object-cover rounded shadow"
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
          {book.readingSuggestions?.length > 0 && (
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

      {/* Reviews Section */}
    <div className="mt-12">
  <h2 className="text-4xl font-bold mb-10 text-center text-indigo-800 underline underline-offset-4">User Reviews</h2>
  {reviewByBook.length === 0 ? (
    <p className="text-center text-gray-500 italic">No reviews yet. Be the first to write one!</p>
  ) : (
    <div className="flex flex-wrap gap-6 justify-center">
      {reviewByBook.map((review, index) => (
        <div
          key={index}
          className="w-full max-w-sm bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-2 flex justify-between items-center">
            <span className="text-indigo-700 font-semibold text-lg">{review.user}</span>
            <RatingStars rating={review.rating} />
          </div>
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  );
};

export default BookDetails;
