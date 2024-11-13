import React, { useEffect, useState } from 'react'
import { Info } from 'lucide-react';

function LiketoWatchList({ movies, order }) {

    const [movieData, setmovieData] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const moviesArray = Object.keys(movies.title).map(id => ({
            id: id,
            title: movies.title[id],
            likes: movies.stats_liked[id],
            watched: movies.stats_watched[id],
            watchedToLikeRatio: movies.watched_to_like_ratio[id]
        }));

        const sortedMovies = order == 'ascending'
            ? [...moviesArray].sort((a, b) => b.watchedToLikeRatio - a.watchedToLikeRatio)
            : [...moviesArray].sort((a, b) => a.watchedToLikeRatio - b.watchedToLikeRatio)

        setmovieData(sortedMovies)
    }, [movies])

    const displayMovies = showAll ? movieData : movieData.slice(0, 2)

    return (
        <div className="p-6 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg w-full md:w-[50%]">
            <div className='relative flex justify-center items-center'>
                {order == 'ascending'
                    ? <p className="text-xl text-center mb-6 font-oswald text-gray-700">Most popular movies you've watched <br /></p>
                    : <p className="text-xl text-center mb-6 font-oswald text-gray-700">Least popular movies you've watched <br /></p>}
                <div className="absolute -right-3 -top-3">
                    <button
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => setShowTooltip(!showTooltip)}
                    >
                        <Info className="w-4 h-4 text-gray-500" />
                    </button>

                    {showTooltip && (
                        <div className="absolute z-50 right-0 top-full mt-2 px-4 py-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap">
                            <div className="flex flex-col gap-2">
                                Sorted by total liked to watch ratio
                            </div>
                            <div className="absolute top-0 right-4 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                    )}
                </div>
            </div>



            <div className="flex flex-col gap-1">
                {displayMovies.map((movie, index) => (
                    <div key={movie.id} className="flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <div className='flex items-center gap-0'>
                            <p className='text-lg p-5'>{index + 1}</p>
                            <div>
                                <h2 className="text-sm font-semibold leading-tight">{movie.title}</h2>
                                <p className="text-gray-700 text-xs">{movie.likes.toLocaleString()} / {movie.watched.toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-md p-5">{movie.watchedToLikeRatio.toFixed(2)}</p>
                    </div>
                ))}
                {movieData.length > 2 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-2 bg-blue-500 text-white p-1 rounded-lg w-full hover:bg-blue-600 transition"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LiketoWatchList