import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TWO_DAYS_MS } from '../../utils/objects';

const corrected_countries = {
    "USA": "United States of America",
    "Republic of Serbia": "Serbia",
    "Kyrgyzstan": "Kyrgyz Republic",
    "England": "United Kingdom"
}
const MovieList = ({ countryName, isFullScreen = false }) => {
    const { stats } = useSelector((state) => state.data);
    const [data, setData] = useState([]);


    useEffect(() => {
        const username = localStorage.getItem("current_stats_username");

        const fetchData = () => {
            if (stats) {
                setData(stats.og_data);
            } else {
                const localStorageKey = `${username}_movie_data`;
                const cachedData = localStorage.getItem(localStorageKey);

                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const fetchedAt = new Date(parsedData.fetchedAt).getTime();
                    const currentTime = Date.now();

                    if (currentTime - fetchedAt < TWO_DAYS_MS) {
                        setData(parsedData.og_data);
                    }
                }
            }
        };

        fetchData();
    }, [stats]);

    const filteredMovies = useMemo(() => {
        if (!data) return [];
        return data.filter(movie => movie.countries.includes(corrected_countries[countryName] || countryName));
    }, [data, countryName]);

    const renderMovieItem = (movie, index) => (
        <div key={index} className="p-1">
            <h2 className="text-xs md:text-sm">{movie.title}</h2>
        </div>
    );

    return (
        <div className={`absolute bg-gray-400 bg-opacity-50 py-1 ${isFullScreen ? 'w-[50%] h-[50%] sm:w-[30%] sm:h-[50%] md:w-60 md:h-96 bottom-0 right-0' : 'w-24 h-28 sm:w-32 sm:h-40 md:w-40 md:h-64 bottom-0 rounded-tr-lg'}`}>
            {filteredMovies.length > 0 && (
                <h1 className="mb-1 text-xs md:text-md text-center pt-1 font-oswald">{countryName}</h1>
            )}
            <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-thin scrollbar-track-gray-300 h-[75%] mf:h-[80%] px-2">
                <div className="flex flex-col gap-1">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map(renderMovieItem)
                    ) : (
                        countryName ? (
                            <p className="text-center text-xs md:text-sm">No movies found for {countryName}.</p>
                        ) : (
                            <p className="text-center text-xs md:text-sm">Click on a country to display its movies.</p>
                        )
                    )}
                </div>
            </div>
        </div>

    );
};

export default MovieList;
