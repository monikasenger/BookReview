import React, { useEffect, useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LatestReviewRating = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/reviews`);
        const data = await response.json();

        if (data.reviews) {
          // Sort by createdAt (newest first), then take top 5
          const sorted = data.reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
          setReviews(sorted);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg">
        No reviews yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 pb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🌟 Latest 5 User Reviews
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id || review.createdAt}
            className="bg-white border rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-indigo-700">
                {review.book?.title || "Unknown Book"}
              </h3>
              <span className="text-yellow-500 font-medium">
                {'⭐'.repeat(review.rating)} ({review.rating})
              </span>
            </div>
            <p className="text-gray-700 italic mb-2">"{review.comment}"</p>
            <p className="text-sm text-gray-500 text-right">— {review.user}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviewRating;

