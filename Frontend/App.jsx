import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetails from './pages/BookDetails';
import BookPage from './pages/BookPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDasboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import ManageBooks from './pages/admin/ManageBooks';
import AddBook from './pages/admin/AddBook';

import EditBook from './pages/admin/EditBook';
import ReviewForm from './components/ReviewForm';
import ManageReviews from './pages/admin/ManageReviews';

function App() {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />
      {
        aToken ? (
          // ✅ ONLY Admin Dashboard shown when logged in
          <Routes>
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path="/admin-dashboard/manage-books" element={<ManageBooks />} />
        <Route path="/admin-dashboard/add-book" element={<AddBook />} />
          <Route path="/admin-dashboard/edit-book/:id" element={<EditBook />} />
        <Route path="/admin-dashboard/review" element={<ManageReviews />} />
            {/* ⛔ Redirect all others to dashboard */}
            <Route path='*' element={<Navigate to='/admin-dashboard' replace />} />
          </Routes>
        ) : (
          // ✅ Public User Routes (when not admin)
          <>
            <Header />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/books' element={<BookPage />} />
              <Route path='/books/:id' element={<BookDetails />} />
              <Route path='/submit-review' element={<ReviewForm />} />
              
              <Route path='/admin-login' element={<AdminLogin />} />
              {/* ⛔ Block admin-dashboard without login */}
              <Route path='/admin-dashboard' element={<Navigate to='/admin-login' replace />} />
            </Routes>
            <Footer />
          </>
        )
      }
    </>
  );
}

export default App;

