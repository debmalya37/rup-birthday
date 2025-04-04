// app/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(false);

  const toggleSurprise = () => {
    setShowSurprise(!showSurprise);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center p-4 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-bounce">
          Happy Birthday, My Love!
        </h1>
        <p className="text-lg md:text-2xl text-white text-center max-w-2xl">
          Today is as unique and beautiful as you are. I hope this day brings you as much joy as you bring to my life.
        </p>
        <img
          src="/heart.png"
          alt="Heart"
          className="w-32 h-32 mt-8 animate-pulse"
        />

        {/* Surprise Button */}
        <button
          onClick={toggleSurprise}
          className="mt-10 px-6 py-3 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Surprise Me!
        </button>

        {/* Surprise Modal */}
        {showSurprise && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh] p-6 mx-4 md:mx-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-pink-600">
                  Happy 19th Birthday!
                </h2>
                <button
                  onClick={toggleSurprise}
                  className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <p className="text-lg text-gray-800 mb-6">
                Dear, on this special day, may all your dreams come true. Enjoy the magic and surprises just for you.
                <br />
                With all my love,<br />
                <span className="font-semibold text-pink-600">Debmalya Sen</span>
              </p>

              {/* Magic effect / Gallery */}
              <div className="mb-6">
                <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-purple-400 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <img
                    src="/pic1.jpg"
                    alt="Memorable Moment 1"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/pic2.jpg"
                    alt="Memorable Moment 2"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/pic3.jpg"
                    alt="Memorable Moment 3"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/pic4.jpg"
                    alt="Memorable Moment 4"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              <button
                onClick={toggleSurprise}
                className="w-full py-2 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition duration-300"
              >
                Close Surprise
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
