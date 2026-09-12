import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listingService } from '../services/authService';
import ListingCard from '../components/ListingCard';
import { toast } from 'react-toastify';
import { FiFilter } from 'react-icons/fi';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('q') || '',
    city: '',
    page: 1
  });

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await listingService.getAll(filters);
        setListings(response.data.listings);
      } catch (error) {
        toast.error('Error loading listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, page: 1 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiFilter /> Filters
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tafuta</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Tafuta..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Zote</option>
                <option value="phones">Simu</option>
                <option value="computers">Computers</option>
                <option value="housing">Nyumba</option>
                <option value="food">Chakula</option>
                <option value="services">Fundi</option>
                <option value="delivery">Bodaboda</option>
                <option value="clothes">Nguo</option>
                <option value="salon">Saluni</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jiji</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Jiji..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Matokeo ({listings.length})</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">⏳ Inapakia...</p>
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-lg text-center">
              <p className="text-gray-500 text-lg">😔 Hakuna matokeo. Jaribu kuzabuni mtu au huduma tofauti.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
