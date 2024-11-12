import React, { useEffect, useState } from 'react'

function Runtime({ movies, order }) {

    const [movieList, setMovieList] = useState([])
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const runtimes = movies
        .filter((movie) => movie.runtime > 0)
        .map((movie) => ({    
            runtime: movie.runtime,
            title: movie.title,
            id: movie.id 
        }));

        const sortedMovies = order === 'ascending'
            ? [...runtimes].sort((a, b) => a.runtime - b.runtime).slice(0, 10)
            : [...runtimes].sort((a, b) => b.runtime - a.runtime).slice(0, 10)

        setMovieList(sortedMovies)
    }, [movies, order]) 

    const displayMovies = showAll ? movieList : movieList.slice(0, 2)

    return (
        <div className="p-5 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg md:w-[50%]">
            {
                order === 'ascending'
                    ? <p className="text-lg text-center mb-6 font-oswald text-gray-700">
                        Shortest movies you've watched
                    </p>
                    : <p className="text-lg text-center mb-6 font-oswald text-gray-700">
                        Longest movies you've watched
                    </p>
            }
            <div className="flex flex-col gap-1" >
                {displayMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <div className='flex items-center gap-0'>
                            <p className='text-md p-4'>{index + 1}</p>
                            <h2 className="text-sm font-semibold">{movie.title}</h2>
                        </div>
                        <p className="text-md p-4">{movie.runtime} mins</p>
                    </div>
                ))}

                {movieList.length > 2 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-2 bg-blue-500 text-white p-1 rounded-lg w-full hover:bg-blue-600 transition"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Runtime
