import React from 'react'
import { Type, userTypeColors, userTypeDescriptions } from '../../utils/objects';

function UserType({ type }) {
    const description = userTypeDescriptions[type] || "Movie watcher type not recognized.";
    const cardColor = userTypeColors[type] || 'bg-white';
    const title = Type[type] 

    const isVowel = (char) => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        return vowels.includes(char.toLowerCase());
    };

    return (
      <div className={`bg-gray-50 bg-opacity-50 shadow-lg w-full flex flex-col items-center justify-between rounded-md p-5 md:p-12 mt-2`}>
        <p className='font-oswald text-md md:text-lg text-gray-700 mb-2 pb-5'>What type of movie watcher are you?</p>
        <div className='w-[70%]'>
            <p className='font-oswald text-lg text-gray-700 md:ml-20'>
            You are {isVowel(title.charAt(0)) ? 'an' : 'a'}
            </p>
            <h2 className={`text-5xl md:text-7xl text-center font-extrabold ${cardColor}  mb-6`}>{title}</h2>

        </div>
        <p className="w-[90%] md:w-[70%] text-center mt-1 md:mt-4 text-md text-gray-800 md:text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
}

export default UserType