import React from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatsError = ({ error, text }) => {
  console.log(error)
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <div className="z-0 h-[90vw] w-[90vw] md:h-[40vw] md:w-[40vw] sm:h-[70vw] sm:w-[70vw] fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0 opacity-50"></div>
      <div className="z-0 h-[75vw] w-[75vw] md:h-[25vw] md:w-[25vw] sm:h-[70vw] sm:w-[70vw] fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0 opacity-50"></div>
      <div className="z-0 h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw] sm:h-[60vw] sm:w-[60vw] fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0 opacity-50"></div>

      <div className="z-10 flex flex-col items-center gap-8 px-4 max-w-md w-full">
        <div>
          <p className="text-[40px] md:text-[60px] font-bebas tracking-tight text-gray-900">UnBoxd</p>
        </div>

        <div className="w-full bg-white bg-opacity-90 rounded-lg shadow-xl p-6 flex flex-col items-center gap-6">
          <AlertCircle className="w-16 h-16 text-red-500" />

          {(error && error === "User doesn't exist") ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User doesn't exist</h2>
              <p className="text-gray-600 mb-4">
                Check if the username is correct
              </p>
            </div>
          ) : error && error === "Failed to fetch data" ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-2">
                {error}
              </p>
              <p className="text-gray-600 mb-4">
                Try again later
              </p>
            </div>
          ) : error ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! something went wrong</h2>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full">

            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsError;