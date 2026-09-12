import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService, reviewService, orderService } from '../services/authService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiStar, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [orderForm, setOrderForm] = useState({ quantity: 1, deliveryAddress: '', notes: '' });
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingService.getById(id);
        setListing(response.data);
        
        const reviewsResponse = await reviewService.getListingReviews(id);
        setReviews(reviewsResponse.data);
      } catch (error) {
        toast.error('Error loading listing');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await orderService.create({
        listingId: id,
        ...orderForm
      });
      toast.success('Order created successfully!');
      setShowOrderForm(false);
      setOrderForm({ quantity: 1, deliveryAddress: '', notes: '' });
    } catch (error) {
      toast.error('Error creating order');
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await reviewService.create({
        listingId: id,
        ...reviewForm
      });
      toast.success('Review posted!');
      setReviewForm({ rating: 5, comment: '' });
      // Refresh reviews
      const response = await reviewService.getListingReviews(id);
      setReviews(response.data);
    } catch (error) {
      toast.error('Error posting review');
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">⏳ Inapakia...</div>;
  if (!listing) return <div className="container mx-auto px-4 py-12 text-center">Tangazo halikupatikana</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left - Images and Details */}
        <div className="md:col-span-2">
          {/* Image */}
          <div className="bg-gray-300 rounded-lg h-96 mb-6 overflow-hidden">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-blue-600">TSh {listing.price?.toLocaleString()}</span>
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-400" fill="currentColor" />
                <span className="font-semibold">{listing.rating || 0} ({reviews.length} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{listing.description}</p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Kategori:</strong> {listing.category}</p>
              <p><strong>Aina:</strong> {listing.type}</p>
              <p className="flex items-center gap-2"><FiMapPin /> {listing.location?.address}</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Maoni</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{review.reviewer?.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <FiStar key={i} className="text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Hakuna maoni</p>
            )}

            {/* Add Review */}
            {user && (
              <form onSubmit={handleReview} className="mt-6 border-t pt-6">
                <h3 className="font-semibold mb-4">Toa Maoni</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Maoni</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Toa maoni yako..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right - Seller Info and Order */}
        <div>
          {/* Seller Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 sticky top-20">
            <h3 className="text-xl font-bold mb-4">Mtu wa Kuuza</h3>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="font-semibold">{listing.seller?.name}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 my-2">
                <FiStar className="text-yellow-400" fill="currentColor" />
                {listing.seller?.rating} ({listing.seller?.totalReviews} reviews)
              </div>
              {listing.seller?.isVerified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✓ Verified</span>
              )}
            </div>

            <div className="space-y-3 mb-6 text-sm">
              {listing.contact?.phone && (
                <a href={`tel:${listing.contact.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <FiPhone /> {listing.contact.phone}
                </a>
              )}
              {listing.contact?.whatsapp && (
                <a href={`https://wa.me/${listing.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                  📱 WhatsApp
                </a>
              )}
              {listing.contact?.email && (
                <a href={`mailto:${listing.contact.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <FiMail /> Email
                </a>
              )}
            </div>

            {/* Order Button */}
            {!showOrderForm ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                Agiza Sasa
              </button>
            ) : (
              <form onSubmit={handleOrder} className="space-y-3">
                {listing.type === 'product' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Kiasi</label>
                    <input
                      type="number"
                      min="1"
                      value={orderForm.quantity}
                      onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">Anwani</label>
                  <input
                    type="text"
                    value={orderForm.deliveryAddress}
                    onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                    placeholder="Anwani ya ukamataji"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Maelezo</label>
                  <textarea
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    placeholder="Maelezo zaidi..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows="2"
                  />
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                  Thibiti Agizo
                </button>
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold"
                >
                  Ghairi
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
