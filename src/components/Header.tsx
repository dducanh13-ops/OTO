import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Car size={32} />
          <span className="text-2xl font-bold">EasyDrive Reviews</span>
        </Link>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </button>
          </form>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
              <li><Link to="/compare" className="hover:text-blue-200">Compare</Link></li>
              <li><Link to="/qanda" className="hover:text-blue-200">Q&A</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;