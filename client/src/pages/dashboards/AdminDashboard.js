import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { adminService } from '../../services/authService';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalListings: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [pendingListings, setPendingListings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsResponse = await adminService.getStats();
        setStats(statsResponse.data);

        const listingsResponse = await adminService.getPendingListings();
        setPendingListings(listingsResponse.data);
      } catch (error) {
        toast.error('Error loading admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleApproveListing = async (id) => {
    try {
      await adminService.approveListing(id);
      toast.success('Listing approved');
      setPendingListings(pendingListings.filter(l => l._id !== id));
    } catch (error) {
      toast.error('Error approving listing');
    }
  };

  const handleRejectListing = async (id) => {
    try {
      await adminService.rejectListing(id);
      toast.success('Listing rejected');
      setPendingListings(pendingListings.filter(l => l._id !== id));
    } catch (error) {
      toast.error('Error rejecting listing');
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">⏳ Inapakia...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">⚙️ Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Jumla ya Watumiaji</p>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Wafanyabiashara</p>
          <p className="text-3xl font-bold">{stats.totalSellers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Jumla ya Tangazo</p>
          <p className="text-3xl font-bold">{stats.totalListings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Jumla ya Agizo</p>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Jumla ya Mapato</p>
          <p className="text-2xl font-bold">TSh {stats.totalRevenue?.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            📊 Muhtasari
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'listings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            📋 Tangazo Inasubiri ({pendingListings.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            👥 Watumiaji
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'reports' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            🚨 Maagizo
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Platform Muhtasari</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">Mtumiaji Sasa</p>
                  <p className="text-4xl font-bold text-blue-600">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-600 mt-2">+12% kumekuwa mwezi huu</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">Mapato</p>
                  <p className="text-4xl font-bold text-green-600">TSh {stats.totalRevenue?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">+8% kumekuwa mwezi huu</p>
                </div>
              </div>
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tangazo Inayosubiri Onyo</h2>
              {pendingListings.length > 0 ? (
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing._id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-lg">{listing.title}</p>
                          <p className="text-gray-600 text-sm">Mwenye Biashara: {listing.seller?.businessName}</p>
                          <p className="text-gray-600 text-sm">Kategori: {listing.category}</p>
                        </div>
                        <FiAlertCircle className="text-yellow-600 text-2xl" />
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-2">{listing.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveListing(listing._id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          <FiCheckCircle /> Kubali
                        </button>
                        <button
                          onClick={() => handleRejectListing(listing._id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          <FiXCircle /> Kataa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Hakuna tangazo inasubiri onyo</p>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Watumiaji Wasiothibitishwa</h2>
              <p className="text-gray-500 text-center py-8">👥 Wanaendesha hapa inayakoma...</p>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Maagizo</h2>
              <p className="text-gray-500 text-center py-8">🚨 Hakuna maagizo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
