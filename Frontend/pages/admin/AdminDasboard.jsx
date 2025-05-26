import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [latestBooks, setLatestBooks] = useState([]);


  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total books count
        const booksRes = await axios.get(`${backendUrl}/api/admin/books`);
        if (booksRes.data.success) {
          setTotalBooks(booksRes.data.books.length);
          setLatestBooks(
            booksRes.data.books
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
          );
        }

        // Fetch total reviews count
        const reviewsRes = await axios.get(`${backendUrl}/api/admin/reviews`);
        if (reviewsRes.data.success) {
          setTotalReviews(reviewsRes.data.reviews.length);
        }
      } catch (error) {
        console.error("Dashboard Data Fetch Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-indigo-700">📚 Total Books</h2>
            <p className="text-3xl font-semibold mt-2">{totalBooks}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-indigo-700">📝 Total Reviews</h2>
            <p className="text-3xl font-semibold mt-2">{totalReviews}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">📖 Latest Added Books</h2>
         <table className="w-full table-auto text-left">
  <thead>
    <tr className="bg-indigo-100">
      <th className="p-2">Title</th>
      <th className="p-2">Author</th>
      <th className="p-2">Rating</th>
      <th className="p-2">Total Review</th> {/* New column */}
    </tr>
  </thead>
  <tbody>
    {latestBooks.length > 0 ? (
      latestBooks.map((book) => (
        <tr key={book._id} className="hover:bg-gray-50">
          <td className="p-2">{book.title}</td>
          <td className="p-2">
            {Array.isArray(book.authorsToLookFor)
              ? book.authorsToLookFor.join(', ')
              : book.authorsToLookFor || 'N/A'}
          </td>
          <td className="p-2">{book.rating || 'Not Rated'}</td>
          <td className="p-2">{book.numberOfReviews || 0}</td> {/* Show total reviews count */}
        </tr>
      ))
    ) : (
      <tr>
        <td className="p-2" colSpan={4}>No books found.</td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
