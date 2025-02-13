import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import { useBookingStore } from './store/bookingStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VehicleList from './components/VehicleList';
import BookingForm from './components/BookingForm';
import BookingPage from './components/BookingPage'; // Import the new BookingPage
import Footer from './components/Footer'; // Extracted footer into a separate component

function App() {
  const { setUser } = useAuthStore();
  const { fetchVehicles } = useBookingStore();

  useEffect(() => {
    // Set up auth listener
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch initial data
    fetchVehicles();

    return () => subscription.unsubscribe();
  }, [setUser, fetchVehicles]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navigation />

        {/* Main Content */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <VehicleList />
              </>
            }
          />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking-form" element={<BookingForm />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;