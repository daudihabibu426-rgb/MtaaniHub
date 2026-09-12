import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-4">Ukurasa haupatikani</h1>
      <p className="text-gray-600 mb-8">Tunaomba karibu. Ukurasa unachotafuta haupo.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
        Rudi Nyumbani
      </Link>
    </div>
  );
};

export default NotFound;
