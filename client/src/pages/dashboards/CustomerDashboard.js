import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { orderService, reviewService, messageService, userService } from '../../services/authService';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiStar, FiMessageSquare, FiHeart } from 'react-icons/fi';

const CustomerDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [messages, setMessages] = useState({});
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0, unreadMessages: 0 });
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersResponse = await orderService.getUserOrders();
        setOrders(ordersResponse.data);

        const conversationsResponse = await messageService.getConversations();
        setMessages(conversationsResponse.data);

        const totalSpent = ordersResponse.data.reduce((sum, order) => sum + order.totalPrice, 0);
        const unreadCount = Object.values(conversationsResponse.data).flat().filter(msg => !msg.isRead && msg.recipient._id === user.id).length;

        setStats({
          totalOrders: ordersResponse.data.length,
          totalSpent,
          unreadMessages: unreadCount
        });
      } catch (error) {
        toast.error('Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.id]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">⏳ Inapakia...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">👤 Dashboard - {user.name}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Jumla ya Agizo</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <FiShoppingCart className="text-4xl text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Jumla ya Matumizi</p>
              <p className="text-3xl font-bold">TSh {stats.totalSpent?.toLocaleString()}</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Ujumbe wa Kukamatia</p>
              <p className="text-3xl font-bold">{stats.unreadMessages}</p>
            </div>
            <FiMessageSquare className="text-4xl text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            📦 Agizo Zangu
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'messages'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            💬 Ujumbe
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'favorites'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            ❤️ Favorites
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 font-semibold border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            ⚙️ Profili
          </button>
        </div>

        <div className="p-6">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Agizo Zangu</h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{order.listing?.title}</p>
                          <p className="text-gray-600">Nambari ya Agizo: {order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between">
                        <span>Kiasi: {order.quantity}</span>
                        <span className="font-bold text-lg">TSh {order.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Hakuna agizo</p>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Ujumbe</h2>
              {Object.keys(messages).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(messages).map(([userId, msgs]) => {
                    const lastMsg = msgs[msgs.length - 1];
                    const otherUser = lastMsg.sender._id === user.id ? lastMsg.recipient : lastMsg.sender;
                    return (
                      <div key={userId} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{otherUser.name}</p>
                            <p className="text-gray-600 text-sm line-clamp-1">{lastMsg.content}</p>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(lastMsg.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Hakuna ujumbe</p>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Favorite Zangu</h2>
              <p className="text-gray-500 text-center py-8">Hakuna favorites</p>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Profili Yangu</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-1">Jina</label>
                  <input type="text" value={user.name} disabled className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={user.email} disabled className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jukwaa</label>
                  <input type="text" value={user.role} disabled className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                  Badilisha Profili
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
