import multer from "multer";

// Define storage strategy
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize upload middleware
const upload = multer({ storage });

// Export as default
export default upload;
