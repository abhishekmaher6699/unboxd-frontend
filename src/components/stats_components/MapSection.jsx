import React, {useState} from 'react'
import ChoroplethMap from './Map'
import MovieList from './MovieList'

const MapSection = ({ data }) => {
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
  };

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 flex items-center z-auto justify-center bg-white' : 'w-full mt-5'}`}
    style={{
        zIndex: 100000
    }}>
      <div className='relative w-full h-full'>
        <ChoroplethMap 
          data={data} 
          isFullscreen={isFullScreen} 
          setIsFullscreen={setIsFullscreen} 
          onCountrySelect={handleCountrySelect} 
        />
        <MovieList 
          countryName={selectedCountry} 
          isFullScreen={isFullScreen} 
        />
      </div>
    </div>
  );
};

export default MapSection;