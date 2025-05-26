import bookModel from "../models/bookModel.js";
import cloudinary from "cloudinary";
import fs from 'fs'
import jwt from 'jsonwebtoken'
// ✅ Add Book
export const addBook = async (req, res) => {
  try {
    const {
      title,
      description,
      readingSuggestions,
      authorsToLookFor,
      genre,
      year,
      price,
      rating,
    } = req.body;

    const imageFile = req.file;

    if (
      !title ||
      !description ||
      !readingSuggestions ||
      !authorsToLookFor ||
      !genre ||
      !year ||
      !price 
       || !imageFile
    ) {
      return res.json({ success: false, message: "Missing required book details" });
    }

    if (isNaN(year) || year < 0 || isNaN(price) || price < 0) {
      return res.json({ success: false, message: "Year and Price must be valid positive numbers" });
    }

     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
       resource_type: "image",
     });
    fs.unlinkSync(imageFile.path);

     const coverUrl = imageUpload.secure_url;

    const bookData = {
      title,
      description,
      readingSuggestions: readingSuggestions.split(",").map(item => item.trim()),
      authorsToLookFor: authorsToLookFor.split(",").map(item => item.trim()),
      genre,
      year,
      price,
      rating: rating || 0,
      numberOfReviews: 0,
       cover: coverUrl,
      reviews: [],
    };

    const newBook = new bookModel(bookData);
    await newBook.save();

    return res.json({ success: true, message: "Book added successfully", book: newBook });

  } catch (error) {
    console.error("Add Book Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//api for admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ✅ Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.json({ success: true, books });
  } catch (error) {
    console.error("Get All Books Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Single Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, book });
  } catch (error) {
    console.error("Get Book Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Single Book by Name
export const getBookTitles = async (req, res) => {
  try {
    const books = await bookModel.find({}, 'title');
    const titles = books.map(book => book.title);
    res.status(200).json({ titles });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book titles', error });
  }
};

// ✅ Update Book
export const updateBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.json({ success: false, message: "Book not found" });
    }

    const {
      title,
      description,
      readingSuggestions,
      authorsToLookFor,
      genre,
      year,
      price,
      rating,
    } = req.body;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      book.cover = uploadResult.secure_url;
    }

    book.title = title || book.title;
    book.description = description || book.description;
    if (readingSuggestions) {
      book.readingSuggestions = Array.isArray(readingSuggestions)
        ? readingSuggestions
        : readingSuggestions.split(",").map((item) => item.trim());
    }

    if (authorsToLookFor) {
      book.authorsToLookFor = Array.isArray(authorsToLookFor)
        ? authorsToLookFor
        : authorsToLookFor.split(",").map((item) => item.trim());
    }
    book.genre = genre || book.genre;
    book.year = year || book.year;
    book.price = price || book.price;
    book.rating = rating || book.rating;

    await book.save();

    res.json({ success: true, message: "Book updated successfully", book });
  } catch (error) {
    console.error("Update Book Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Admin Dashboard
export const adminDashboard = async (req, res) => {
  try {
    const books = await bookModel.find({}).sort({ createdAt: -1 });
    const totalBooks = books.length;
    const totalReviews = books.reduce((acc, book) => acc + (book.reviews?.length || 0), 0);
    const latestBooks = books.slice(0, 5);

    const dashData = {
      totalBooks,
      totalReviews,
      latestBooks,
    };

    res.json({ success: true, dashData });

  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.json({ success: false, message: error.message });
  }
};
