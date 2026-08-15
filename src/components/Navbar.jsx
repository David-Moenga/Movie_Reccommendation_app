import { Film } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-2" aria-label="CineScope home">
          <Film className="text-[#E64833]" />
          <span className="text-xl font-bold">CineScope</span>
        </a>

        <ul className="hidden md:flex space-x-6 font-medium text-sm">
          <li><a href="#home" className="hover:text-[#E64833]">Home</a></li>
          <li><a href="#all-movies" className="hover:text-[#E64833]">Movies</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
