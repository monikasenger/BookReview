import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNavbar from "../../components/AdminNavbar";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [book, setBook] = useState({
    title: "",
    genre: "",
    description: "",
    cover: "",  // This will hold the URL string of existing cover
    readingSuggestions: [],
    authorsToLookFor: [],
    year: "",
    price: "",
    rating: "",
  });

  // Separate state to hold the newly selected file (if any)
  const [bookCover, setBookCover] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/books/${id}`);
        if (data.success) {
          setBook({
            ...data.book,
            readingSuggestions: Array.isArray(data.book.readingSuggestions)
              ? data.book.readingSuggestions
              : [],
            authorsToLookFor: Array.isArray(data.book.authorsToLookFor)
              ? data.book.authorsToLookFor
              : [],
            cover: data.book.cover || "", // existing cover url
          });
        } else {
          toast.error(data.message || "Failed to fetch book details");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

 const handleArrayChange = (e) => {
  const { name, value } = e.target;

  // Convert comma-separated string into array for specific fields
  if (name === "readingSuggestions" || name === "authorsToLookFor") {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item); // Remove empty strings
    setBook((prev) => ({ ...prev, [name]: arrayValue }));
  } else {
    setBook((prev) => ({ ...prev, [name]: value }));
  }
};


  // Handle form submit with cover upload if new file selected
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverUrl = book.cover;

      // If user selected a new cover file, upload it first
      if (bookCover) {
        const formData = new FormData();
        formData.append("file", bookCover);

        // Replace this URL with your real image upload API
        const uploadRes = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (uploadRes.data.success) {
          coverUrl = uploadRes.data.url; // Assuming backend returns uploaded image URL in `url`
        } else {
          toast.error("Cover upload failed");
          setLoading(false);
          return;
        }
      }

      // Prepare updated book data with final cover URL
      const updatedBook = { ...book, cover: coverUrl };

      const { data } = await axios.put(`${backendUrl}/api/admin/books/${id}`, updatedBook);

      if (data.success) {
        toast.success("Book updated successfully!");
        navigate("/admin-dashboard/manage-books");
      } else {
        toast.error(data.message || "Failed to update book");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating book");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      {/* Cover Upload */}
      <div className="flex flex-col items-center space-y-2 mb-6">
        <label
          htmlFor="book-cover"
          className="cursor-pointer hover:scale-105 transition"
          title="Upload Book Cover"
        >
          <img
            src={
              bookCover
                ? URL.createObjectURL(bookCover)
                : book.cover || "/default-cover.png" /* fallback image */
            }
            alt="Book Cover Upload"
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Genre</label>
          <input
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Reading Suggestions (comma separated)
          </label>
          <input
            name="readingSuggestions"
            value={(Array.isArray(book.readingSuggestions) ? book.readingSuggestions : []).join(", ")}
            onChange={handleArrayChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Authors to Look For (comma separated)
          </label>
          <input
            name="authorsToLookFor"
            value={(Array.isArray(book.authorsToLookFor) ? book.authorsToLookFor : []).join(", ")}
            onChange={handleArrayChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Year</label>
          <input
            name="year"
            type="number"
            value={book.year}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={book.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Rating</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={book.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-4"
        >
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
    </>
  );
};

export default EditBook;
