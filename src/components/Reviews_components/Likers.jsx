import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function MostActiveLikers({ data }) {
    const [likers, setLikers] = useState([]);

    useEffect(() => {
        if (!data) return;

        const likeCounts = {};
        Object.values(data).forEach((reviews) => {
            reviews.forEach((review) => {
                review.liked_by.forEach((user) => {
                    likeCounts[user] = (likeCounts[user] || 0) + 1;
                });
            });
        });

        // Convert to an array and sort by the number of likes in descending order
        const sortedLikers = Object.entries(likeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([user, count]) => ({ user, count }));

        setLikers(sortedLikers);
    }, [data]);

    return (
        <div className=" bg-gray-50 bg-opacity-50 w-full rounded-lg shadow-lg p-6">

            <p className="text-xl text-center mb-6 font-oswald text-gray-700">
                Top review likers
            </p>

            <div className="flex flex-col gap-1" >
                {likers.slice(0, 5).map(({ user, count }, index) => (
                    <div key={user} className="flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <div className='flex items-center gap-0'>
                            <p className='text-md p-5 md:p-4'>{index + 1}</p>
                            <h2 className="text-sm lg:text-md font-semibold">
                                <a href={`https://letterboxd.com${user}`} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                                    {user.slice(1, -1)}
                                </a>
                            </h2>
                        </div>
                        <div className='flex items-center justify-center p-5 md:p-4 gap-1'>
                            <p className="text-sm">
                                {count}
                            </p>
                            <FaHeart color='red' size={12} />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}


export default MostActiveLikers;
