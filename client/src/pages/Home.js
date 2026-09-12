import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiTrendingUp } from 'react-icons/fi';
import { listingService } from '../services/authService';
import ListingCard from '../components/ListingCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState([
    { icon: '📱', name: 'Simu & Accessories', slug: 'phones' },
    { icon: '💻', name: 'Computers', slug: 'computers' },
    { icon: '🏠', name: 'Nyumba', slug: 'housing' },
    { icon: '🍔', name: 'Chakula', slug: 'food' },
    { icon: '🔧', name: 'Fundi', slug: 'services' },
    { icon: '🛵', name: 'Bodaboda', slug: 'delivery' },
    { icon: '👕', name: 'Nguo', slug: 'clothes' },
    { icon: '💇', name: 'Saluni', slug: 'salon' }
  ]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingService.getAll({ limit: 8 });
        setListings(response.data.listings);
      } catch (error) {
        toast.error('Error loading listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎯 MtaaniHub</h1>
          <p className="text-xl mb-8">Kila huduma, kila biashara, karibu yako</p>
          <form className="max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 flex items-center bg-white rounded-lg px-4 py-3">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Tafuta huduma (mfano: fundi friji)"
                className="bg-white outline-none flex-1 ml-2 text-gray-800"
              />
            </div>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
              Tafuta
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">📂 Kategori</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/search?category=${cat.slug}`}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <p className="font-semibold text-gray-800">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">⭐ Tangazo la Mkondo</h2>
            <Link to="/search" className="text-blue-600 hover:text-blue-800 font-semibold">
              Angalia Zote →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">⏳ Inapakia...</p>
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">Hakuna tangazo</p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">10k+</p>
              <p className="text-lg">Wafanyabiashara</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50k+</p>
              <p className="text-lg">Tangazo</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100k+</p>
              <p className="text-lg">Mteja</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5M+</p>
              <p className="text-lg">Shughuli</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Je, uko mwenye biashara?</h2>
          <p className="text-gray-600 mb-8 text-lg">Taja tangazo lako sasa na mwanzo kupata wateja mpya!</p>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block">
            Jifunza Zaidi
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
