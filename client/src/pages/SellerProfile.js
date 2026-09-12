import React from 'react';

const SellerProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md text-center sticky top-20">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Mwenye Biashara</h1>
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
              ⭐⭐⭐⭐⭐
            </div>
            <p className="text-gray-600 text-sm mb-4">123 reviews</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mb-2">
              Simu
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
              WhatsApp
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Kuhusu Sisi</h2>
            <p className="text-gray-700 mb-4">Biashara nzuri na miezi 5+ ya kuwa mtaji. Tunachagua kazi yenye ubora wa juu kwa bei ya soko.
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Mahali:</strong> Dar es Salaam</p>
              <p><strong>Imeanzishwa:</strong> 2023</p>
              <p><strong>Wajibu:</strong> 98%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tangazo Likizi</h2>
            <p className="text-gray-500 text-center py-12">Hakuna tangazo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
