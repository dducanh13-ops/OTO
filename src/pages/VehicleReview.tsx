import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ThumbsUp, ThumbsDown, DollarSign, Fuel, Shield, Car, User, PlayCircle } from 'lucide-react';

const VehicleReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showVideo, setShowVideo] = useState(false);

  // Mock data for the review
  const review = {
    name: 'Toyota Camry',
    year: 2024,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    summary: 'The Toyota Camry continues to be a reliable and comfortable midsize sedan, perfect for daily commutes and family trips.',
    pros: ['Smooth ride', 'Fuel-efficient', 'Spacious interior'],
    cons: ['Not as sporty as some competitors', 'Base model lacks some features'],
    bestFor: ['Families', 'Commuters', 'Those seeking reliability'],
    specs: {
      engine: '2.5L 4-cylinder',
      horsepower: '203 hp',
      fuelEconomy: '28 city / 39 highway mpg',
      price: 'Starting at $26,320',
    },
    userReviews: [
      { user: 'John D.', rating: 5, comment: 'Great family car, very comfortable for long trips.' },
      { user: 'Sarah M.', rating: 4, comment: 'Fuel efficiency is impressive, but I wish it had more power.' },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={review.image} alt={review.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{review.year} {review.name}</h1>
        <button
          onClick={() => setShowVideo(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <PlayCircle className="mr-2" size={20} />
          Watch Review
        </button>
      </div>
      <div className="flex items-center mb-4">
        <Star className="text-yellow-400 mr-1" />
        <span className="text-xl font-semibold">{review.rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-700 mb-6">{review.summary}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Pros</h2>
          <ul className="space-y-2">
            {review.pros.map((pro, index) => (
              <li key={index} className="flex items-center">
                <ThumbsUp className="text-green-500 mr-2" size={20} />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Cons</h2>
          <ul className="space-y-2">
            {review.cons.map((con, index) => (
              <li key={index} className="flex items-center">
                <ThumbsDown className="text-red-500 mr-2" size={20} />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Best For</h2>
        <ul className="flex flex-wrap gap-2">
          {review.bestFor.map((item, index) => (
            <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Key Specs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Car className="text-gray-500 mr-2" size={20} />
            <span><strong>Engine:</strong> {review.specs.engine}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="text-gray-500 mr-2" size={20} />
            <span><strong>Fuel Economy:</strong> {review.specs.fuelEconomy}</span>
          </div>
          <div className="flex items-center">
            <Shield className="text-gray-500 mr-2" size={20} />
            <span><strong>Horsepower:</strong> {review.specs.horsepower}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="text-gray-500 mr-2" size={20} />
            <span><strong>Price:</strong> {review.specs.price}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">User Reviews</h2>
        <div className="space-y-4">
          {review.userReviews.map((userReview, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="text-gray-500 mr-2" size={20} />
                <span className="font-semibold">{userReview.user}</span>
                <div className="ml-auto flex items-center">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  <span>{userReview.rating}</span>
                </div>
              </div>
              <p>{userReview.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleReview;