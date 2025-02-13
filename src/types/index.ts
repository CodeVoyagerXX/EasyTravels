export interface Vehicle {
  id: string;
  name: string;
  type: 'small' | 'medium' | 'large';
  capacity: {
    passengers: number;
    luggage: string;
  };
  features: string[];
  pricePerDay: number;
  images: string[];
  availability: boolean;
}

export interface Booking {
  id: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bookings: string[];
}