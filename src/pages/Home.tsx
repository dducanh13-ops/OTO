import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, DollarSign, Fuel } from 'lucide-react';
import { vehicles, Vehicle, getVehicleImage } from '../data/vehicles';

const VEHICLES_PER_PAGE = 8;

const Home: React.FC = () => {
  const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const allMakes = Array.from(new Set(vehicles.map(v => v.make))).sort();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    setPage(1);
  }, [location.search]);

  useEffect(() => {
    const filtered = vehicles.filter(v => {
      const matchesMake = selectedMakes.length === 0 || selectedMakes.includes(v.make);
      const matchesSearch = searchQuery === '' || 
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.year.toString().includes(searchQuery);
      return matchesMake && matchesSearch;
    });
    setDisplayedVehicles(filtered.slice(0, page * VEHICLES_PER_PAGE));
  }, [selectedMakes, page, searchQuery]);

  const handleMakeToggle = (make: string) => {
    setSelectedMakes(prev =>
      prev.includes(make) ? prev.filter(m => m !== make) : [...prev, make]
    );
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to EasyDrive Reviews</h1>
        <p className="text-xl text-gray-600">Practical car reviews for everyday drivers</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Browse Vehicles</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {allMakes.map(make => (
              <button
                key={make}
                onClick={() => handleMakeToggle(make)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedMakes.includes(make) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {make}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedVehicles.map((vehicle) => (
            <Link key={vehicle.id} to={`/review/${vehicle.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }} />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  <span>{vehicle.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    {vehicle.price.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Fuel size={16} className="mr-1" />
                    {vehicle.fuelEconomy}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {displayedVehicles.length < vehicles.filter(v => (selectedMakes.length === 0 || selectedMakes.includes(v.make)) && (searchQuery === '' || v.make.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()) || v.year.toString().includes(searchQuery))).length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Why Choose EasyDrive Reviews?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Star className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Expert Reviews</h3>
            <p>Get insights from our team of automotive experts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DollarSign className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Price Comparisons</h3>
            <p>Easily compare prices across different models and brands.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Fuel className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Fuel Efficiency</h3>
            <p>Find the most fuel-efficient vehicles for your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;