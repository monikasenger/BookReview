import React, { useContext, useState } from 'react';
import {
  FaBook,
  FaPenFancy,
  FaCalendarAlt,
  FaMoneyBill,
  FaStar,
  FaListAlt,
} from 'react-icons/fa';
import AdminNavbar from '../../components/AdminNavbar';
import { bookasset } from '../../assets/bookasset';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const AddBook = () => {
  const [bookCover, setBookCover] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [readingSuggestions, setReadingSuggestions] = useState('');
  const [authorsToLookFor, setAuthorsToLookFor] = useState('');
  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!bookCover) {
      toast.error('Please upload a book cover.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('cover', bookCover);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('genre', genre);
      formData.append('year', year);
      formData.append('price', price);
      formData.append('rating', rating);
      formData.append('readingSuggestions', JSON.stringify(readingSuggestions.split(',').map((s) => s.trim())));
      formData.append('authorsToLookFor', JSON.stringify(authorsToLookFor.split(',').map((a) => a.trim())));

      const { data } = await axios.post(`${backendUrl}/api/admin/addBook`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          aToken,
        },
      });

      if (data.success) {
        toast.success(data.message || 'Book added successfully!');
        // Clear form
        setBookCover(null);
        setTitle('');
        setDescription('');
        setGenre('');
        setYear('');
        setPrice('');
        setRating('');
        setReadingSuggestions('');
        setAuthorsToLookFor('');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="w-full h-full flex items-center justify-center p-4 bg-gray-100">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-2xl sm:max-w-3xl bg-white p-5 rounded-lg shadow-lg border border-gray-200 space-y-4"
        >
          <h2 className="text-xl sm:text-3xl font-bold text-center text-purple-600">
            ➕ Add Book
          </h2>

          {/* Cover Upload */}
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="book-cover" className="cursor-pointer hover:scale-105 transition">
              <img
                src={bookCover ? URL.createObjectURL(bookCover) : bookasset.upload_area}
                alt="Upload"
                className="w-16 h-16 object-cover rounded-full border border-purple-500 shadow-md"
              />
            </label>
            <input
              type="file"
              id="book-cover"
              accept="image/*"
              hidden
              onChange={(e) => setBookCover(e.target.files[0])}
            />
            <p className="text-gray-500 text-xs sm:text-sm">Upload Cover</p>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Title */}
            <div>
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaBook className="text-purple-600" /> Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaListAlt className="text-purple-600" /> Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              >
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non Fiction">Non Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaCalendarAlt className="text-purple-600" /> Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Published Year"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaMoneyBill className="text-purple-600" /> Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Book Price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaStar className="text-purple-600" /> Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            {/* Suggestions */}
            <div className="col-span-2">
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaPenFancy className="text-purple-600" /> Reading Suggestions (comma separated)
              </label>
              <input
                type="text"
                value={readingSuggestions}
                onChange={(e) => setReadingSuggestions(e.target.value)}
                placeholder="e.g. Book1, Book2"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* Authors */}
            <div className="col-span-2">
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaPenFancy className="text-purple-600" /> Authors To Look For (comma separated)
              </label>
              <input
                type="text"
                value={authorsToLookFor}
                onChange={(e) => setAuthorsToLookFor(e.target.value)}
                placeholder="e.g. Author1, Author2"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                <FaPenFancy className="text-purple-600" /> Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 sm:w-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg shadow-md text-sm font-semibold uppercase tracking-wide transition transform hover:scale-105 active:scale-95"
            >
              📚 Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBook;
