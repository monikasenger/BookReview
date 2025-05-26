import reviewModel from '../models/reviewModel.js';
import bookModel from '../models/bookModel.js';

// ✅ Add a Review
export const addReview = async (req, res) => {
  try {
    const { user, book, rating, comment } = req.body;

    if (!user || !book || !comment) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Find the book document by title
    const targetBook = await bookModel.findOne({ title: book });

    if (!targetBook) {
      return res.json({ success: false, message: "Book not found" });
    }

    // Create new review document in reviewModel collection
    const newReview = await reviewModel.create({
      user,
      book: targetBook._id,  // Reference to book by ID
      rating: rating || 5,
      comment,
      createdAt: new Date(),
    });

    // Update book document's reviews array with the review ID or embed review info (optional)
    targetBook.reviews.push(newReview._id);  // assuming reviews array stores review IDs
    targetBook.numberOfReviews = targetBook.reviews.length;

    // Calculate average rating by fetching all reviews for this book from reviewModel
    const bookReviews = await reviewModel.find({ book: targetBook._id });
    targetBook.rating = bookReviews.reduce((acc, curr) => acc + curr.rating, 0) / bookReviews.length;

    await targetBook.save();

    res.json({ success: true, message: "Review added successfully", book: targetBook });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.json({ success: false, message: error.message });
  }
};


// ✅ Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate('book').sort({ createdAt: -1 }); // populates book info
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};

