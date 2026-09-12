import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🏘️ MtaaniHub</h3>
            <p className="text-gray-400">Jukwaa linalotuidi kila huduma na biashara karibu yako.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kiungo</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Nyumbani
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white">
                  Tafuta
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  Kuhusu Sisi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Wasiliana
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Msaada</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Masharti
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Faragha
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white">
                  Usaidizi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Wasiliana</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FiPhone /> +255 XXX XXX XXX
              </li>
              <li>Email: info@mtaanihub.tz</li>
              <li>Dar es Salaam, Tanzania</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-400">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-400">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MtaaniHub. Haki zote zimehifadhiwa.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
