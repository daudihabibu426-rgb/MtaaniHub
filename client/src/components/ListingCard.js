import React from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-gray-300 h-48 overflow-hidden">
          {listing.images && listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{listing.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-blue-600">TSh {listing.price?.toLocaleString()}</span>
            {listing.seller?.isVerified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✓ Verified</span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{listing.location?.city}</span>
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400" fill="currentColor" />
              <span>{listing.rating || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
