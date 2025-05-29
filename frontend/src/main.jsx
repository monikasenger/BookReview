import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'
import BookContextProvider from './context/BookContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <AdminContextProvider>
  <AppContextProvider>
    <BookContextProvider>
      <App/>
    </BookContextProvider>
    
  </AppContextProvider>
  </AdminContextProvider> 
  </BrowserRouter>,
)
