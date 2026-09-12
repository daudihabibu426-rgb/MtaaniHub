import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...data } = formData;
      const response = await authService.register(data);
      dispatch(registerSuccess(response.data));
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Jina</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Simu</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="+255 XXX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Chagua Jukwaa</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="customer">Mteja</option>
              <option value="seller">Mwenye Biashara</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? 'Inapakia...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Una akaunti? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
