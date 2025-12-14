import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AddSweet from './pages/AddSweet';
import ManageSweets from './pages/ManageSweets';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import EditSweet from './pages/EditSweet';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50 font-sans text-gray-900'>

      <Navbar />

      <div className="container mx-auto p-4">
        <Routes>


          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />


          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/add-sweet"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddSweet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-sweets"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageSweets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-sweet/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditSweet />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={
            <div className="text-center mt-20 text-red-500 font-bold text-xl">
              404 - Page Not Found
            </div>
          } />

        </Routes>

        <Footer />
      </div>
    </div>
  )
}

export default App;