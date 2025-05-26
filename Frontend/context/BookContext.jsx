import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/books`, {
        headers: { aToken },
      });

      if (data.success) {
        setBooks(data.books);
        console.log(data.books);
      } else {
        toast.error(data.message || "Failed to fetch books");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  // New: Update book by id
  const updateBook = async (id, updatedBookData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/api/admin/books/${id}`,
        updatedBookData,
        {
          headers: { aToken },
        }
      );

      if (data.success) {
        toast.success("Book updated successfully!");

        // Update the book in local state to keep UI in sync
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === id ? data.book : book))
        );
      } else {
        toast.error(data.message || "Failed to update book");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating book");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    books,
    setBooks,
    getAllBooks,
    updateBook,
    loading,
    aToken,
    setAToken,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
