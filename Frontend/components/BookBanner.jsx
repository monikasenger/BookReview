import React from 'react';
import { Link } from 'react-router-dom';

const BookBanner = () => {
  return (
    <div className="mt-12 mx-auto max-w-6xl px-4">
      <div className="relative bg-gradient-to-r from-blue-800 via-cyan-700 to-teal-800 text-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-16 gap-6 md:gap-10">
          {/* Text Section */}
          <div className="md:w-2/3 space-y-4 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight tracking-wide">
              Welcome to <span className="text-yellow-300">BookBuzz</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Dive into a world of stories, reviews, and ratings — all powered by Monika’s platform.
            </p>
            <Link
              to="/books"
              className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2.5 px-6 rounded-xl transition duration-300 shadow-lg"
            >
              Browse Books
            </Link>
          </div>

          {/* Image Section */}
          <div className="md:w-1/3 flex justify-center animate-fadeIn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
              alt="Books Banner"
              className="w-48 md:w-60 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBanner;

