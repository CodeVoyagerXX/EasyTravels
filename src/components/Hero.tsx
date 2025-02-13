import React from 'react';
import { Calendar, MapPin, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block mb-5">සුරක්ෂිත සහ </span>
                <span className="block text-blue-600">විශ්වසනීය සංචාර</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              අපගේ හොඳම රියදුරන් සමඟ කරදරයකින් තොර කුලී වෑන් රථ අත්දැකීමක් ලබා ගන්න.ඔබගේ සියලුම සංචාර අවශ්‍යතා සඳහා සුදුසු වන අතර, පහසුව, සුරක්ෂිතතාව සහ විශ්වාසදායකත්වය තහවුරු කරයි. පවුලේ සංචාරයක් ගියත්, මාර්ග සංචාරයක් සැලසුම් කළත්, ඔබ වෙනුවෙන් පරිපූර්ණ වෑන් රථයක් අප සතුව ඇත.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#booking" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  වෙන් කරවා ගන්න
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#vehicles" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                  වාහන විස්තර
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1587813369290-091c9d432daf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Van on the road"
        />
      </div>
    </div>
  );
}