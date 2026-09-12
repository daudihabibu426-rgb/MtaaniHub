import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FiMenu, FiX, FiSearch, FiMapPin } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-blue-600">MtaaniHub</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 max-w-md">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Tafuta huduma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 outline-none flex-1 ml-2"
            />
          </div>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/search" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <FiMapPin /> Karibu yako
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center bg-white rounded-lg px-4 py-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Tafuta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white outline-none flex-1 ml-2"
                />
              </div>
            </form>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-600 hover:text-blue-600 py-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 hover:text-blue-600 py-2">
                  Login
                </Link>
                <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
