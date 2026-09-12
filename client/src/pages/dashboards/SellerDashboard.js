import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listingService, orderService, adminService } from '../../services/authService';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const SellerDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalListings: 0, totalEarnings: 0, totalOrders: 0 });
  const [activeTab, setActiveTab] = useState('listings');
  const [showListingForm, setShowListingForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    type: 'product'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const ordersResponse = await orderService.getSellerOrders();
        setOrders(ordersResponse.data);

        const totalEarnings = ordersResponse.data
          .filter(o => o.paymentStatus === 'completed')
          .reduce((sum, o) => sum + o.totalPrice, 0);

        setStats({
          totalListings: 0,
          totalEarnings,
          totalOrders: ordersResponse.data.length
        });
      } catch (error) {
        toast.error('Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      await listingService.create(formData);
      toast.success('Listing created successfully!');
      setFormData({ title: '', description: '', category: '', price: '', type: 'product' });
      setShowListingForm(false);
    } catch (error) {
      toast.error('Error creating listing');
    }
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Unakusudiwa kufuta tangazo hili?')) {
      try {
        await listingService.delete(id);
        toast.success('Listing deleted');
      } catch (error) {
        toast.error('Error deleting listing');
      }
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success('Order status updated');
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">⏳ Inapakia...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🏪 Dashboard - {user.name}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Tangazo Zangu</p>
              <p className="text-3xl font-bold">{stats.totalListings}</p>
            </div>
            <span className="text-4xl">📋</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Jumla ya Agizo</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Jumla ya Soko</p>
              <p className="text-3xl font-bold">TSh {stats.totalEarnings?.toLocaleString()}</p>
            </div>
            <span className="text-4xl">💵</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'listings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            📋 Tangazo Zangu
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            📦 Agizo
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            📊 Takwimu
          </button>
        </div>

        <div className="p-6">
          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tangazo Zangu</h2>
                {!showListingForm && (
                  <button
                    onClick={() => setShowListingForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FiPlus /> Tangazo Mpya
                  </button>
                )}
              </div>

              {showListingForm && (
                <form onSubmit={handleCreateListing} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Jina</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Jina la tangazo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Maelezo</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      rows="4"
                      placeholder="Maelezo zaidi..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Kategori</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Kategori"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bei</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Bei"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Aina</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="product">Bidhaa</option>
                      <option value="service">Huduma</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
                      Taja
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowListingForm(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                      Ghairi
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {listings.length > 0 ? (
                  listings.map((listing) => (
                    <div key={listing._id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md">
                      <div>
                        <p className="font-semibold text-lg">{listing.title}</p>
                        <p className="text-gray-600 text-sm">{listing.category} • TSh {listing.price?.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">Hakuna tangazo</p>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Agizo zangu</h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">{order.listing?.title}</p>
                          <p className="text-gray-600 text-sm">Mteja: {order.customer?.name}</p>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                        >
                          <option value="pending">Inasubiri</option>
                          <option value="confirmed">Inathibitishwa</option>
                          <option value="completed">Imemalizwa</option>
                          <option value="cancelled">Ilighairi</option>
                        </select>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Kiasi: {order.quantity}</span>
                        <span className="font-semibold">TSh {order.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Hakuna agizo</p>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Takwimu Zangu</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                <p>📊 Analytics feature coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
