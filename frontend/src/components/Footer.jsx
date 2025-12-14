import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMN 1: BRAND INFO */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-pink-500 flex items-center">
              🍬 Sweet Shop
            </h2>
            <p className="text-sm text-gray-400">
              Spreading happiness with every bite. Authentic Indian sweets made with pure ingredients and love.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-pink-500 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-pink-400 transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-pink-400 transition duration-300">My Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-pink-400 transition duration-300">Login / Signup</Link>
              </li>
              <li>
                <Link to="/admin/add-sweet" className="hover:text-pink-400 transition duration-300">Admin Panel</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT INFO */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-pink-500 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>Sweet Market, Ludhiana, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>support@sweetshop.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-pink-500 inline-block">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to get updates on new arrivals and offers!
            </p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2 rounded font-bold hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT SECTION */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sweet Shop Management System. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ by <span className="text-pink-400 font-bold">Your Name</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;