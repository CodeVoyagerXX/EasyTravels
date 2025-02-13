import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';

const BookingPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [start, setStart] = useState(''); // Ensure this is defined
  const [end, setEnd] = useState(''); // Ensure this is defined
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [adminSettings, setAdminSettings] = useState({
    fuelEfficiency: 0,
    fuelPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  // Gallery-specific state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        // Replace this with your actual API call or data fetching logic
        const vehicles = [
          {
            id: '1',
            name: 'Nissan Caravan',
            fuelEfficiency: 1, // km per liter
            fuelPrice: 90, // LKR per liter
            images: [
              'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nissan_Caravan_E24_003.JPG/1200px-Nissan_Caravan_E24_003.JPG?20080628193446',
            ],
          },
          {
            id: '2',
            name: 'Toyota KDH',
            fuelEfficiency: 1,
            fuelPrice: 90,
            images: [
              'https://luxurykdhvanhireservice.com/wp-content/uploads/classified-listing/2023/06/photo_2022-05-23_06-49-48-720x462.jpg',
              'https://erp.lakpura.com/images/LK94622784-06-E.JPG',
            ],
          },
        ];
        const selectedVehicle = vehicles.find((v) => v.id === id);
        if (selectedVehicle) {
          setVehicle(selectedVehicle);
          setAdminSettings({
            fuelEfficiency: selectedVehicle.fuelEfficiency,
            fuelPrice: selectedVehicle.fuelPrice,
          });
        } else {
          toast.error('Vehicle not found');
        }
      } catch (error) {
        toast.error('Failed to fetch vehicle data');
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  // Debounced search function
  const searchLocations = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Accept-Language': 'en-US',
          },
        }
      );
      const results = response.data.map((item) => ({
        display: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));
      setSuggestions(results);
    } catch (error) {
      toast.error('Failed to fetch locations');
      console.error('Nominatim API error:', error);
    }
  };

  // Debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((query, setSuggestions) => {
      searchLocations(query, setSuggestions);
    }, 300),
    []
  );

  const handleStartInputChange = (e) => {
    setStart(e.target.value);
    debouncedSearch(e.target.value, setStartSuggestions);
  };

  const handleEndInputChange = (e) => {
    setEnd(e.target.value);
    debouncedSearch(e.target.value, setEndSuggestions);
  };

  const selectLocation = (location, isStart) => {
    if (isStart) {
      setStart(location.display);
      setStartCoords({ lat: parseFloat(location.lat), lon: parseFloat(location.lon) });
      setStartSuggestions([]);
    } else {
      setEnd(location.display);
      setEndCoords({ lat: parseFloat(location.lat), lon: parseFloat(location.lon) });
      setEndSuggestions([]);
    }
  };

  const calculateDistance = async () => {
    if (!startCoords || !endCoords) {
      toast.error('Please select valid start and end locations');
      return;
    }
    try {
      // Use OSRM API for distance calculation
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`
      );
      if (response.data.routes?.length > 0) {
        const distanceInKm = response.data.routes[0].distance / 1000;
        setDistance(distanceInKm);
        calculatePrice(distanceInKm);
      } else {
        toast.error('Could not calculate route between locations');
      }
    } catch (error) {
      toast.error('Failed to calculate distance');
      console.error('OSRM API error:', error);
    }
  };

  const calculatePrice = (distance) => {
    const fuelCost = ((distance * 2) / adminSettings.fuelEfficiency) * adminSettings.fuelPrice;
    setPrice(fuelCost.toFixed(2));
  };

  // Handle gallery navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === vehicle.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? vehicle.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Book {vehicle.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery Section */}
        <div className="relative w-full">
          {/* Main Image */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img
              src={vehicle.images[currentIndex]}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              &#10094;
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="space-y-4">
          {/* Start Location */}
          <div className="relative">
            <label className="block mb-2">Start Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={start}
              onChange={handleStartInputChange}
              placeholder="Enter starting location"
            />
            {startSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto">
                {startSuggestions.map((location, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectLocation(location, true)}
                  >
                    {location.display}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* End Location */}
          <div className="relative">
            <label className="block mb-2">End Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={end}
              onChange={handleEndInputChange}
              placeholder="Enter destination"
            />
            {endSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto">
                {endSuggestions.map((location, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectLocation(location, false)}
                  >
                    {location.display}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Calculate Price Button */}
          <button
            onClick={calculateDistance}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Calculate Price
          </button>

          {/* Results */}
          {distance && (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-lg">Distance: {(distance * 2).toFixed(2)} km</p>
              <p className="text-xl font-bold mt-2">Estimated Price: LKR {price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;