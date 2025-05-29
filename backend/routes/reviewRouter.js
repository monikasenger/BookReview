// routes/reviewRoutes.js
import express from "express";
import { addReview, getAllReviews, deleteReview,getReviewByBook } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.get("/book", getReviewByBook);
export default reviewRouter;
