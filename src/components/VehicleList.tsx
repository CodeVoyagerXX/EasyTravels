import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const vehicles = [
  {
    id: '1',
    name: 'Nissan Caravan',
    type: 'Local Tours',
    capacity: {
      passengers: 15 ,
      luggage: '3.5m³'
    },
    features: ['Air Conditioning', 'Bluetooth', 'Reverse Camera', 'Tv'],
    pricePerDay: 'TBA',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nissan_Caravan_E24_003.JPG/1200px-Nissan_Caravan_E24_003.JPG?20080628193446'],
    availability: true
  },
  {
    id: '2',
    name: 'Toyota KDH',
    type: 'Foreign Tours',
    capacity: {
      passengers: 10,
      luggage: '6.5m³'
    },
    features: ['Dual Air Conditioning', 'Bluetooth', 'Reverse Camera', 'Cruise Control'],
    pricePerDay: 'TBA',
    images: ['https://erp.lakpura.com/images/LK94622784-06-E.JPG'],
    availability: true
  }
];

export default function VehicleList() {
  return (
    <div className="bg-gray-50 py-12" id="vehicles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          අපේ වාහන
          </h2>
          <p className="mt-4 text-xl text-gray-500">
          අපගේ විශ්වාසනීය සහ හොඳින් නඩත්තු කරන ලද වෑන් රථ පරාසයෙන් තෝරන්න
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={vehicle.images[0]}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{vehicle.name}</h3>
                <p className="mt-2 text-gray-500">Capacity: {vehicle.capacity.passengers}</p>
                <p className="mt-2 text-gray-500">luggage: {vehicle.capacity.luggage}</p>
                <ul className="mt-4 space-y-2">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-2xl font-bold text-gray-900">{vehicle.pricePerDay}</p>
                  <p className="text-sm text-gray-500">with Driver</p>
                </div>
                <Link to={`/booking/${vehicle.id}`}>
  <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
    Book Now
  </button>
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}