import React, { useState } from 'react';
import { Car, DollarSign, Fuel, Shield, Star } from 'lucide-react';

const vehicles = [
  { id: 1, name: 'Toyota Camry', price: 26320, fuelEconomy: '28/39', horsepower: 203, rating: 4.5 },
  { id: 2, name: 'Honda Civic', price: 23950, fuelEconomy: '31/40', horsepower: 158, rating: 4.3 },
  { id: 3, name: 'Ford F-150', price: 33695, fuelEconomy: '20/24', horsepower: 290, rating: 4.7 },
  { id: 4, name: 'Tesla Model 3', price: 41190, fuelEconomy: '134/126', horsepower: 283, rating: 4.8 },
];

const ComparisonTool: React.FC = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);

  const handleVehicleSelect = (vehicleId: number) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    } else if (selectedVehicles.length < 3) {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vehicle Comparison Tool</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select up to 3 vehicles to compare:</h2>
        <div className="flex flex-wrap gap-4">
          {vehicles.map(vehicle => (
            <button
              key={vehicle.id}
              onClick={() => handleVehicleSelect(vehicle.id)}
              className={`px-4 py-2 rounded-full ${
                selectedVehicles.includes(vehicle.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {vehicle.name}
            </button>
          ))}
        </div>
      </div>

      {selectedVehicles.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Feature</th>
                {selectedVehicles.map(id => (
                  <th key={id} className="px-6 py-3 text-left">{vehicles.find(v => v.id === id)?.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 flex items-center"><DollarSign className="mr-2" /> Price</td>
                {selectedVehicles.map(id => (
                  <td key={id} className="px-6 py-4">${vehicles.find(v => v.id === id)?.price.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 flex items-center"><Fuel className="mr-2" /> Fuel Economy (City/Highway)</td>
                {selectedVehicles.map(id => (
                  <td key={id} className="px-6 py-4">{vehicles.find(v => v.id === id)?.fuelEconomy}</td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 flex items-center"><Shield className="mr-2" /> Horsepower</td>
                {selectedVehicles.map(id => (
                  <td key={id} className="px-6 py-4">{vehicles.find(v => v.id === id)?.horsepower} hp</td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 flex items-center"><Star className="mr-2" /> Rating</td>
                {selectedVehicles.map(id => (
                  <td key={id} className="px-6 py-4">{vehicles.find(v => v.id === id)?.rating.toFixed(1)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;