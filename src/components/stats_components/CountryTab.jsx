import React, { useState, useEffect } from 'react';
import Flag from 'react-world-flags';
import { COUNTRYCODES } from "/src/utils/objects.js"

const CountryTab = ({ countries }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth < 768)};
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleExpansion = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div className='bg-slate-600 bg-opacity-30 px-5 md:px-10 pt-5 pb-4 w-[90%] md:w-[80%] lg:w-[50%] rounded-md flex flex-col gap-5'>
            <p className='text-white font-oswald text-lg'>Countries Explored: {countries.length}</p>
            <div className="grid grid-cols-4 md:grid-cols-10 gap-3 md:gap-4">
                {countries.slice(0, isExpanded ? countries.length : (isMobile ? 8 : 10)).map((country) => {
                    const countryCode = COUNTRYCODES[country] || null;

                    return (
                        <div key={country} className="flex flex-col items-center">
                            {countryCode ? (
                                <Flag code={countryCode} className='md:w-16 w-10' title={country} />
                            ) : (
                                <span>Flag not available</span>
                            )}
                        </div>
                    );
                })}
            </div>

            <button 
                onClick={toggleExpansion} 
                className='flex items-center justify-center text-white cursor-pointer'>
                <span>{isExpanded ? '▲' : '▼'}</span>
                <span className=' text-sm ml-2'>{isExpanded ? 'Show Less' : 'Show More'}</span>
            </button>
        </div>
    );
};

export default CountryTab;
