import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiPhone } from 'react-icons/fi';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
        {/* Image */}
        <div className="bg-gray-300 h-48 overflow-hidden relative">
          {listing.images?.[0] ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              📷 No Image
            </div>
          )}
          {listing.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">{listing.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{listing.description}</p>

          {/* Details */}
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiMapPin size={16} />
              <span>{listing.location?.address || 'Location TBA'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {listing.category}
              </span>
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400" fill="currentColor" size={16} />
              <span className="text-sm font-semibold">{listing.rating || 0}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">TSh {listing.price?.toLocaleString()}</p>
            </div>
          </div>

          {/* Seller */}
          <div className="mt-4 pt-4 border-t flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-gray-800">{listing.seller?.name || 'Seller'}</p>
              {listing.seller?.isVerified && (
                <p className="text-green-600 text-xs">✓ Verified</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
