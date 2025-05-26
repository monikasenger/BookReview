import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { books } from '../assets/bookasset';
import BookBanner from '../components/BookBanner';
import LatestReviewRating from '../components/LatestReviewRating';
import ReviewForm from '../components/ReviewForm';

const HomePage = () => {
  const [booksList, setBooksList] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBooksList(books);

    const storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    setUserReviews(storedReviews);
  }, []);

  const handleMoreClick = () => {
    navigate('/books');
  };

  const handleAddReview = (newReview) => {
    const updatedReviews = [...userReviews, newReview];
    setUserReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BookBanner />

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-10">
          📚 Featured Books
        </h2>

        {booksList.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No books available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {booksList.slice(0, 4).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleMoreClick}
                className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition"
              >
                More Books →
              </button>
            </div>
          </>
        )}
      </section>

      {/* Latest Reviews */}
      <LatestReviewRating reviews={userReviews} />

      {/* Add Review Form */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <ReviewForm onAddReview={handleAddReview} />
      </section>
    </div>
  );
};

export default HomePage;

