import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import ListingDetail from './pages/ListingDetail';
import SellerProfile from './pages/SellerProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import SellerDashboard from './pages/dashboards/SellerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/seller/:id" element={<SellerProfile />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          
          {user && (
            <>
              {user.role === 'customer' && <Route path="/dashboard" element={<CustomerDashboard />} />}
              {user.role === 'seller' && <Route path="/dashboard" element={<SellerDashboard />} />}
              {user.role === 'admin' && <Route path="/dashboard" element={<AdminDashboard />} />}
            </>
          )}
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
