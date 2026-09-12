import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm">M</div>
              MtaaniHub
            </h3>
            <p className="text-sm">Kila huduma, kila biashara, karibu yako.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Huduma</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-400">Tafuta Huduma</a></li>
              <li><a href="#" className="hover:text-blue-400">Post Listing</a></li>
              <li><a href="#" className="hover:text-blue-400">Maoni</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Jua Zaidi</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-400">Kuhusu Sisi</a></li>
              <li><a href="#" className="hover:text-blue-400">Maswali Yanayoulizwa Mara Kwa Mara</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Wasiliana</h4>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <FiPhone /> +255 XXX XXX XXX
              </div>
              <div className="flex items-center gap-2">
                <FiMail /> hello@mtaanihub.tz
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin /> Dar es Salaam, Tanzania
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 MtaaniHub. All rights reserved. | <a href="#" className="hover:text-blue-400">Privacy Policy</a> | <a href="#" className="hover:text-blue-400">Terms & Conditions</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
