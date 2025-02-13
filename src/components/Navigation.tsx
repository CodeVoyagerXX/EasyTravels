import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">වෑන් රථ</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#vehicles" className="text-gray-600 hover:text-gray-900">වාහන</a>
              <a href="#booking" className="text-gray-600 hover:text-gray-900">වෙන් කරවා ගන්න</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">විස්තර</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">සම්බන්ධ කරන්න</a>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#vehicles" className="block px-3 py-2 text-gray-600">Vehicles</a>
              <a href="#booking" className="block px-3 py-2 text-gray-600">Book Now</a>
              <a href="#about" className="block px-3 py-2 text-gray-600">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600">Contact</a>
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-gray-600"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block w-full text-left px-3 py-2 text-gray-600"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}