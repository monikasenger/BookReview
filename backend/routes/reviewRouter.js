import express from 'express';
import { addReview, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Route to post a new review
router.post('/', addReview);

// Route to get all reviews for a specific book by title
router.get('/', getAllReviews);

export default router;
