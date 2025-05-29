// pages/Admin/ManageReviews.jsx
import React, { useEffect, useContext, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { BookContext } from "../../context/BookContext";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageReviews = () => {
  const { getAllBooks } = useContext(BookContext);
  const { aToken, backendUrl, reviews, getAllReviews, setReviews } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks();
    getAllReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      setLoading(true);
      const res = await axios.delete(`${backendUrl}/api/reviews/${id}`, {
        headers: { aToken },
      });
      if (res.data.success) {
        toast.success("Review deleted successfully");
        setReviews((prev) => prev.filter((review) => review._id !== id));
      } else {
        toast.error(res.data.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Error deleting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>

        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const book = review.book;

              return (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-semibold mb-1">
                    {book ? book.title : "Unknown Book"}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Reviewer:</strong> {review.reviewerName || "Anonymous"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Rating:</strong> ⭐ {review.rating?.toFixed(1)}
                  </p>
                  <p className="text-gray-800 mb-2">
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    <em>{new Date(review.createdAt).toLocaleDateString()}</em>
                  </p>

                  <div className="flex gap-3">
                   
                    <button
                      onClick={() => handleDelete(review._id)}
                      disabled={loading}
                      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageReviews;
