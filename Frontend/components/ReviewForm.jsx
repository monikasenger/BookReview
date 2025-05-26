import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [bookName, setBookName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [bookOptions, setBookOptions] = useState([]);

  // Fetch book names
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/books`);
      setBookOptions(res.data.titles); // ✅ match with `titles` from backend
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  fetchBooks();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !bookName || !comment) {
      alert("Please fill all required fields");
      return;
    }

    const review = {
      user: name.trim(),
      book: bookName.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
    };

    try {
      await axios.post(`${backendUrl}/api/reviews`, review);
      alert("Review submitted successfully!");
      setName('');
      setBookName('');
      setRating(5);
      setComment('');
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-5">
      <h2 className="text-xl font-bold text-center text-indigo-700">Leave a Book Review</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Your Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Book Name</label>
        <input
          type="text"
          list="book-names"
          className="w-full border border-gray-300 rounded-md p-2"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter or select book"
          required
        />
        <datalist id="book-names">
          {bookOptions.map((book, idx) => (
            <option key={idx} value={book} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[5, 4, 3, 2, 1].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 && 's'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Comment</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          required
        ></textarea>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
 