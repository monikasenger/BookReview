# BookBuzz – Book Review App (Admin-Only)

**BookBuzz** is a MERN stack-based web application designed to manage and display book reviews. This version is **Admin-centric**, meaning only the admin can add, edit, or delete books and reviews. The user login/registration feature has been intentionally removed for simplicity.

## 📌 Project Highlights

- Admin dashboard for full control over content
- Add, update, and delete books with cover image, author, genre, and description
- Post, edit, and delete reviews (with rating)
- Each book shows average star rating and total reviews
- Clean and intuitive UI using React
- MongoDB for database, Express and Node.js for backend APIs


## ✅ Core Features

### Admin Functionalities:
- Login with email and password (hardcoded or API-based)
- Add new books with details:
  - Title
  - Author
  - Genre
  - Cover Image
  - Description
- Edit/delete existing books
- Add reviews for each book (reviewer name, comment, and star rating)
- Edit/delete reviews
- Star rating system (1 to 5 stars)
- Average rating display per book

### Removed:
- User login/registration (authentication system)
- Public user access and review submission


## ⚙️ Tech Stack

**Frontend:**
- React.js
- Axios
- React Router DOM
- Tailwind CSS / Bootstrap / CSS Modules (as used)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB with Mongoose

## 🛠️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/bookbuzz-admin.git
cd bookbuzz-admin
