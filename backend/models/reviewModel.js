import mongoose from 'mongoose';

const reviewSchema  = new mongoose.Schema({
  user: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });


const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default reviewModel;