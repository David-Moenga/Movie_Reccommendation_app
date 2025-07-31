import React from 'react';
import { Film } from 'lucide-react'; // Optional: install lucide-react or use any icon
import { Link } from 'react-router-dom'; // If using React Router

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Film className="text-[#E64833]" />
          <span className="text-xl font-bold">CineScope</span>
        </div>

        {/* Nav links */}
        <ul className="hidden md:flex space-x-6 font-medium text-sm">
          <li><a href="#" className="hover:text-[#E64833]">Home</a></li>
          <li><a href="#trending" className="hover:text-[#E64833]">Trending</a></li>
          <li><a href="#about" className="hover:text-[#E64833]">About</a></li>
        </ul>

        {/* Mobile menu button - optional if you want a mobile dropdown later */}
        <div className="md:hidden">
          <button>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
