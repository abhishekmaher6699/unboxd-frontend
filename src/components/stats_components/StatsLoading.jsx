import React from 'react';

const StatsLoading = () => {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <div className="z-0 h-[90vw] w-[90vw] md:h-[40vw] md:w-[40vw] sm:h-[70vw] sm:w-[70vw] fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0 animate-pulse"></div>
      <div className="z-0 h-[75vw] w-[75vw] md:h-[25vw] md:w-[25vw] sm:h-[70vw] sm:w-[70vw] fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0 animate-pulse"></div>
      <div className="z-0 h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw] sm:h-[60vw] sm:w-[60vw] fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0 animate-pulse"></div>
      
      <div className="z-10 flex flex-col items-center justify-center gap-8">
        <div className="animate-bounce">
          <p className="text-[40px] md:text-[60px] font-bebas tracking-tight text-gray-900">UnBoxd</p>
        </div>
        
        <div className="flex gap-4 mt-8">
          <div className="w-20 h-20 rounded-full bg-red-600 animate-fade-in-out" style={{ animationDelay: '0s' }}></div>
          <div className="w-20 h-20 rounded-full bg-green-600 animate-fade-in-out" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-20 h-20 rounded-full bg-blue-600 animate-fade-in-out" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className='w-[50%]'>
          <p className='"text-gray-600 text-center'>Please wait while we get your data. It could take some time</p>
        </div>

      </div>
    </div>
  );
};

export default StatsLoading;
