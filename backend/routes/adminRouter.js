import express from 'express';
import { addBook,getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  adminDashboard, 
  loginAdmin,
  getBookTitles} from '../controllers/adminBookController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

// Route to add a new book
adminRouter.post("/addBook",authAdmin, upload.single('cover'), addBook);
adminRouter.post("/editBook",authAdmin, upload.single('cover'), updateBook);
adminRouter.post("/admin-login",loginAdmin);
adminRouter.get("/books", getAllBooks);
adminRouter.get("/books/:id", getBookById);
adminRouter.get('/', getBookTitles);
adminRouter.put("/books/:id", upload.single("cover"), updateBook);
adminRouter.delete("/books/:id", deleteBook);
adminRouter.get("/dashboard", adminDashboard);
export default adminRouter;
