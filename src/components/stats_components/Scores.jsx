import React from 'react'
import MyWordCloud from './WordCloudSection'

function Scores({ data }) {
    const diversity_score = data.diversity_score
    const obscurity_score = data.obscurity_score
    const words = data.word_cloud

    return (
        <div className="mt-8 flex flex-col justify-center items-center md:gap-16 gap-4 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between rounded-lg p-6">
                <div className="text-center md:w-[45%] mb-6 md:mb-0">
                    <p className="font-oswald text-lg text-gray-700 md:mb-2">Diversity Score</p>
                    <h1 className="text-8xl font-extrabold text-red-600">
                        {(Number((diversity_score * 100).toFixed(1)))}
        
                        <span className="text-base font-light text-gray-500">/100</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-gray-600 text-gray-800 leading-relaxed">
                        Your Diversity Score shows how broad and varied your movie collection is.
                        A higher score means you’re exploring films from different genres, countries, themes, languages, and release years,
                        showcasing your wide-ranging taste.
                    </p>
                </div>
                <div className="text-center md:w-[45%]">
                    <p className="font-oswald text-lg text-gray-700 mb-0 md:mb-2">Obscurity Score</p>
                    <h1 className="text-8xl font-extrabold text-green-600">
                        {(Number((obscurity_score * 100).toFixed(1)))}
                        <span className="text-base font-light text-gray-500">/100</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-gray-600 text-gray-800 leading-relaxed">
                        Your Obscurity Score tells you how unique or unconventional your movie choices are.
                        A higher score means you’re diving into more hidden gems, older classics, and lesser-known films that aren’t typically in the spotlight.
                    </p>
                </div>
            </div>
            <div className=''>
                <p className='text-center font-oswald text-md md:text-lg text-gray-700 mb-4 '>Words describing the movies you watch:</p>
                <MyWordCloud data={words} />
            </div>
        </div>

    )
}

export default Scores