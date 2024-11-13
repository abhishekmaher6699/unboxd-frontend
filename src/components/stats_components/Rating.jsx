import React, { useState, useEffect } from 'react';
import RatingDiff from './Difference_Graph';
import Ratings_Graph from './Ratings_Graph';

function calculateMean(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const mean = sum / arr.length;
    return mean;
}

function Rating({ data }) {

    const [isMobile, setIsMobile] = useState(false);

    const filteredRatings = data.og_data.filter(movie => movie.user_rating > 0);
    const averageRating = (filteredRatings.reduce((sum, movie) => sum + movie.user_rating, 0) / filteredRatings.length).toFixed(2)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const diff_ratio = calculateMean(data.processed_data.rating_diff).toFixed(2)

    return (
        <div className='w-full md:w-[80%] lg:w-[50%]'>
            <div className='flex gap-5 flex-col justify-between items-center'>
                <div className={`w-full`}>
                    <Ratings_Graph data={data.og_data} isMobile = {isMobile}/>
                    <div className="text-center mt-0 py-1 px-1 rounded-lg bg-slate-600 bg-opacity-30">
                        <p className='text-sm text-gray-100 leading-relaxed'>
                            Your average rating is  <span className="text-blue-400 font-extrabold ml-1 text-xl"> {averageRating}</span>
                        </p>
                    </div>
                </div>

                <div className={`w-full`}>
                    <RatingDiff data={data.processed_data}  isMobile = {isMobile}/>
                    <div className="text-center mt-0 p-3 rounded-lg bg-slate-600 bg-opacity-30">
                        <p className='text-sm text-gray-100 leading-6'>
                            {diff_ratio > 0
                                ? <span>Your rating difference ratio is <span className="text-green-400 font-extrabold ml-1 text-xl">{diff_ratio}</span>. <br />It means you generally rate movies higher than their average rating.</span>
                                : <span>Your rating difference ratio is <span className="text-red-400 font-extrabold ml-1 text-xl">{diff_ratio}</span>. <br />It means you generally rate movies lower than their average rating.</span>
                            }
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Rating;
