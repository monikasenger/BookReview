// controllers/reviewController.js
import reviewModel from "../models/reviewModel.js";
import bookModel from "../models/bookModel.js";

//  Add Review
export const addReview = async (req, res) => {
  try {
    const { user, book, rating, comment, reviewerName } = req.body;

    if (!user || !book || !comment) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const targetBook = await bookModel.findOne({ title: book });
    if (!targetBook) {
      return res.json({ success: false, message: "Book not found" });
    }

    const newReview = await reviewModel.create({
      user,
      book: targetBook._id,
      rating: rating || 5,
      comment,
      reviewerName,
      createdAt: new Date(),
    });

    targetBook.reviews.push(newReview._id);
    targetBook.numberOfReviews = targetBook.reviews.length;

    const bookReviews = await reviewModel.find({ book: targetBook._id });
    targetBook.rating = bookReviews.reduce((acc, curr) => acc + curr.rating, 0) / bookReviews.length;

    await targetBook.save();

    res.json({ success: true, message: "Review added successfully", book: targetBook });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//  Get All Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate("book");
    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch reviews" });
  }
};

//  Delete Review
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }

    const book = await bookModel.findById(review.book);
    if (book) {
      book.reviews = book.reviews.filter((r) => r.toString() !== reviewId);
      const remainingReviews = await reviewModel.find({ book: book._id, _id: { $ne: reviewId } });

      book.rating =
        remainingReviews.length === 0
          ? 0
          : remainingReviews.reduce((acc, curr) => acc + curr.rating, 0) / remainingReviews.length;
      book.numberOfReviews = remainingReviews.length;
      await book.save();
    }

    await reviewModel.findByIdAndDelete(reviewId);

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get Review for bbok
export const getReviewByBook =async (req, res) => {
  try {
    const {bookId}= req.query;
    const reviews = await reviewModel.find({book: bookId});
    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: "Failed to get reviews" });
  }
};