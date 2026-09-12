import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { useSelector } from 'react-redux';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ListingDetail from './pages/ListingDetail';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import SellerDashboard from './pages/dashboards/SellerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import SellerProfile from './pages/SellerProfile';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <ListingDetail />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Search />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/seller/:id"
          element={
            <Layout>
              <SellerProfile />
            </Layout>
          }
        />

        {/* Cart Routes */}
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Customer Dashboard */}
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute requiredRole="customer">
              <Layout>
                <CustomerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Seller Dashboard */}
        <Route
          path="/dashboard/seller"
          element={
            <ProtectedRoute requiredRole="seller">
              <Layout>
                <SellerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
