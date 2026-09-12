import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            🏘️ MtaaniHub
          </Link>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 max-w-md">
            <div className="flex items-center w-full bg-gray-100 rounded-lg px-4 py-2">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tafuta huduma..."
                className="bg-transparent outline-none flex-1 ml-2"
              />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <FiShoppingCart /> Karata
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <FiUser /> {user.name}
                  </button>
                  <div className="hidden group-hover:block absolute right-0 bg-white shadow-lg rounded-lg py-2 w-48">
                    {user.role === 'customer' && (
                      <Link to="/dashboard/customer" className="block px-4 py-2 hover:bg-gray-100">
                        📊 Dashboard
                      </Link>
                    )}
                    {user.role === 'seller' && (
                      <Link to="/dashboard/seller" className="block px-4 py-2 hover:bg-gray-100">
                        🏪 Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link to="/dashboard/admin" className="block px-4 py-2 hover:bg-gray-100">
                        ⚙️ Admin
                      </Link>
                    )}
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      ⚙️ Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tafuta..."
                  className="bg-transparent outline-none flex-1 ml-2"
                />
              </div>
            </form>
            {user ? (
              <>
                <Link to="/cart" className="block text-gray-700 hover:text-blue-600 font-semibold">
                  🛒 Karata
                </Link>
                {user.role === 'customer' && (
                  <Link to="/dashboard/customer" className="block text-gray-700 hover:text-blue-600 font-semibold">
                    📊 Dashboard
                  </Link>
                )}
                {user.role === 'seller' && (
                  <Link to="/dashboard/seller" className="block text-gray-700 hover:text-blue-600 font-semibold">
                    🏪 Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/dashboard/admin" className="block text-gray-700 hover:text-blue-600 font-semibold">
                    ⚙️ Admin
                  </Link>
                )}
                <Link to="/settings" className="block text-gray-700 hover:text-blue-600 font-semibold">
                  ⚙️ Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600 font-semibold">
                  Login
                </Link>
                <Link to="/register" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-semibold">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
