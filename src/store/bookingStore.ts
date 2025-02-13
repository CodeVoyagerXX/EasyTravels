import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Vehicle, Booking } from '../types';
import toast from 'react-hot-toast';

interface BookingState {
  vehicles: Vehicle[];
  bookings: Booking[];
  loading: boolean;
  fetchVehicles: () => Promise<void>;
  fetchUserBookings: () => Promise<void>;
  createBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  vehicles: [],
  bookings: [],
  loading: false,
  fetchVehicles: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('name');
      
      if (error) throw error;
      set({ vehicles: data, loading: false });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      set({ loading: false });
    }
  },
  fetchUserBookings: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('bookings')
        .select('*, vehicles(*)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ bookings: data, loading: false });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      set({ loading: false });
    }
  },
  createBooking: async (booking) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([booking]);
      
      if (error) throw error;
      toast.success('Booking created successfully!');
      get().fetchUserBookings();
    } catch (error) {
      toast.error('Error creating booking');
      console.error('Error creating booking:', error);
    }
  },
  cancelBooking: async (bookingId) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
      
      if (error) throw error;
      toast.success('Booking cancelled successfully!');
      get().fetchUserBookings();
    } catch (error) {
      toast.error('Error cancelling booking');
      console.error('Error cancelling booking:', error);
    }
  },
}));