import React, { useEffect, useState } from 'react';

function Friends_List({ data }) {

    const top_friends = Object.entries(data).slice(0, 5)

    return (
        <div className=" bg-gray-50 bg-opacity-50 w-full rounded-lg shadow-lg p-6">

            <p className="text-xl text-center mb-6 font-oswald text-gray-700">
                 Similar users in your network
            </p>

            <div className="flex flex-col gap-1" >
                {top_friends.map(([name, { url, similarity, pic }], index) => (
                    <div key={url} className="flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
                        <div className='flex items-center gap-0 p-5 md:p-4'>
                            <div className=''>
                                <a href={`https://letterboxd.com${url}`} className='flex items-center justify-center gap-5' target="_blank" rel="noopener noreferrer">
                                    <img src={pic} alt={`${name}'s avatar`} className="h-10 rounded-full " />
                                    <h3 className='text-sm md:text-md font-semibold'>{name}</h3>
                                </a>
                            </div>
                        </div>
                        <div className='flex items-center justify-center p-5 md:p-4 gap-1 text-md'>
                            <p>{(Number((similarity * 100).toFixed(1)))}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Friends_List