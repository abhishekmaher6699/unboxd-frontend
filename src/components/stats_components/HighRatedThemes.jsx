import React, { useState, useEffect } from 'react'


function HighRatedThemes({ themes }) {
    const [showAll, setShowAll] = useState(false)
    const data = Object.entries(themes).map(([theme, ratio]) => ({
        theme,
        ratio
    }))

    const displayMovies = showAll ? data.slice(0, 10) : data.slice(0, 2)
    return (
        <div className=" bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6">

            <p className="text-xl text-center mb-6 font-oswald text-gray-700">
                Your favorite themes
            </p>
            
            <div className="flex flex-col gap-1" >
                {displayMovies.map((movie, index) => (
                    <div key={movie.theme} className="flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <div className='flex items-center gap-0'>
                            <p className='text-md p-5 md:p-4'>{index + 1}</p>
                            <h2 className=" text-sm md:text-md font-semibold">{movie.theme}</h2>
                        </div>
                        <p className="text-md p-5 md:p-4">{movie.ratio.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            {data.length > 2 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-2 bg-blue-500 text-white p-1 rounded-lg w-full hover:bg-blue-600 transition"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
        </div>
    )
}

export default HighRatedThemes