"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null); // 👈 add ref

  // Array of background images (couple-themed)
  const backgroundImages = ["/couple.jpg","/couple6.jpg","/couple7.jpg", "/couple2.jpg","/couple.avif", "/couple4.avif","/couple5.avif","/couple3.jpg"];

  // Cycle background images every 7 seconds with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const toggleSurprise = () => {
    setShowSurprise(!showSurprise);

// Try to play audio on user interaction
if (audioRef.current) {
  audioRef.current.play().catch((err) => {
    console.warn("Audio play blocked:", err);
  });
}
  };

  
  return (
    <>
      {/* Background audio */}
      <audio ref={audioRef} src="/audio.mp3" loop className="hidden" />

      <Navbar />
      <main className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {backgroundImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                idx === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        {/* Giant Heart Background (center overlay) */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <img
            src="/heart4.png"
            alt="Giant Heart"
            className="opacity-70 w-[50%] h-auto animate-fadeIn transform scale-110 transition duration-500 hover:scale-105"
          />
        </div>

        {/* Main Content */}
<div className="relative z-10 text-center px-4 py-10 sm:py-16">
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 bg-clip-text text-transparent animate-textWave drop-shadow-[0_2px_20px_rgba(255,0,128,0.7)] mb-6">
    Happy Birthday, My Love!
  </h1>

  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-6 px-2 sm:px-4 animate-fadeIn delay-200 leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.6)]">
    Today is as unique and beautiful as you are. I hope this day brings you as much joy as you bring to my life.
  </p>

  <div className="flex justify-center space-x-3 mb-8">
    <img
      src="/heart1.png"
      alt="Heart"
      className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce"
    />
    
  </div>

  <button
            onClick={toggleSurprise}
            className="mt-4 px-8 py-3 bg-white text-pink-500 font-bold rounded-full shadow-xl hover:bg-gray-100 transition duration-300 animate-fadeIn delay-400"
          >
            Surprise Me!
          </button>
</div>


      {/* Multi-Layered Animated Waves at the Bottom */}
<div className="absolute bottom-0 w-full h-60 overflow-hidden">
  <div className="relative w-[200%] h-full animate-waveMove">
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 w-full h-full"
    >
      {/* First Wave - Light Pink */}
      <path
        fill="#FFB6C1"
        fillOpacity="1"
        d="M0,160L48,149.3C96,139,192,117,288,106.7C384,96,480,96,576,122.7C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L0,320Z"
      ></path>
      {/* Second Wave - Bold Red */}
      <path
        fill="#FF0000"
        fillOpacity="0.8"
        d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,192C672,203,768,181,864,170.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L0,320Z"
      ></path>
      {/* Third Wave - Dark Luxury Red */}
      <path
        fill="#8B0000"
        fillOpacity="0.9"
        d="M0,288L48,272C96,256,192,224,288,202.7C384,181,480,171,576,165.3C672,160,768,160,864,181.3C960,203,1056,245,1152,256C1248,267,1344,245,1392,234.7L1440,224L1440,320L0,320Z"
      ></path>
    </svg>

    {/* Duplicate SVG for seamless animation loop */}
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[1440px] w-full h-full"
    >
      {/* Same waves duplicated */}
      <path fill="#FFB6C1" fillOpacity="1" d="M0,160L48,149.3C96,139..." />
      <path fill="#FF0000" fillOpacity="0.8" d="M0,224L48,202.7C96,181..." />
      <path fill="#8B0000" fillOpacity="0.9" d="M0,288L48,272C96,256..." />
    </svg>
  </div>

  <style jsx>{`
    @keyframes waveMove {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-waveMove {
      animation: waveMove 15s linear infinite;
    }
  `}</style>
</div>

        {/* Surprise Modal */}
        {showSurprise && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] p-8 mx-4 md:mx-0 transform transition-all duration-300 scale-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600">
                  Happy 19th Birthday!
                </h2>
                <button
                  onClick={toggleSurprise}
                  className="text-gray-600 hover:text-gray-900 text-3xl font-bold"
                >
                  &times;
                </button>
              </div>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                Dear Chupkatha 😂! accha Sorry Rupkatha 🙃, on this special day, may all your dreams come true. The amount of joy you bring into my life is immeasurable. I am so grateful to have you by my side. You are not just my partner but also my best friend. I cherish every moment we spend together, and I look forward to creating many more beautiful memories with you.
                <br />
                With all my love,
                <br />
                <span className="font-semibold text-pink-600">
                  Yours forever,
                  <br />
                  <span className="text-2xl text-red-500">❤️</span>
                  Deb
                </span>
              </p>
             {/* Gallery */}
<div className="mb-6">
  <div className="w-full h-1 bg-gradient-to-r from-pink-500 to-red-500 mb-6"></div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="w-full aspect-square bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden"
      >
        <img
          src={`/memories/${i + 1}.jpg`}
          alt={`Memory ${i + 1}`}
          className="max-w-full max-h-full object-contain transition-transform transform hover:scale-105"
        />
      </div>
    ))}
  </div>
</div>


              <button
                onClick={toggleSurprise}
                className="w-full py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition duration-300"
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
