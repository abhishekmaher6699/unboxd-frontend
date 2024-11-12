import React, { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Rectangle } from 'recharts';
import { Info } from 'lucide-react';
import { languageLookup } from '../../utils/objects';

function BarGraph({ data, rated_genre_data = null, element, label = "label", items = null, color = "#8884d8", title }) {
    const [isgenre, setisgenre] = useState(false);
    const [useHighRated, setUseHighRated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setisgenre(element === 'genres');
    }, [element]);

    const displayData = useMemo(() => {
        if (isgenre && useHighRated && rated_genre_data) {
            return Object.entries(rated_genre_data).map(([genre, rating]) => ({
                [label]: genre,
                count: rating
            }));
        }

        const allElements = data.flatMap(movie => movie[element]);
        const sortedElements = Object.entries(
            allElements.reduce((acc, value) => {
                if (element === 'original_language') {
                    acc[languageLookup[value]] = (acc[languageLookup[value]] || 0) + 1;
                } else {
                    acc[value] = (acc[value] || 0) + 1;
                }
                return acc;
            }, {})
        ).sort((a, b) => b[1] - a[1]);

        const stats = sortedElements.map(([value, count]) => ({
            [label]: value,
            count
        }));

        return items ? stats.slice(0, items) : stats;
    }, [data, element, items, label, isgenre, useHighRated, rated_genre_data]);

    const margins = isMobile
        ? { top: 20, right: 0, left: -20, bottom: 50 }
        : { top: 20, right: 0, left: 0, bottom: 50 }

    return (
        <div className={`w-full flex flex-col mt-5 pb-0 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6 ${element === 'genres' || element === 'original_language' ? 'lg:w-full' : 'lg:w-[50%]'}`}>
            {isgenre ? (
                <div className='relative flex justify-center items-center'>
                    <h3 className='text-center font-oswald text-lg text-gray-700'>{title}</h3>
                    <div className="absolute right-0 top-0">
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
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold">Watch count:</span>
                                        <span>Highest watched genres</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold">High rated:</span>
                                        <span>Genres you rate high (≥4)</span>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-4 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                            </div>
                        )}
                    </div>
                </div>
            )
                : (
                    <h3 className='text-center font-oswald text-lg text-gray-700'>{title}</h3>
                )}

            {isgenre && (
                <div className='flex justify-center mt-5'>
                    <button
                        className={`bg-gray-500 font-sans text-xs py-1 px-2 text-white rounded-l-full border-r transition-all duration-150 ease-in-out ${!useHighRated ? 'bg-green-600 shadow-inner' : 'hover:shadow-md'
                            }`}
                        onClick={() => setUseHighRated(false)}
                    >
                        Watch count
                    </button>
                    <button
                        className={`bg-gray-500 font-sans text-xs py-1 px-2 text-white rounded-r-full border-r transition-all duration-150 ease-in-out ${useHighRated ? 'bg-green-600 shadow-inner' : 'hover:shadow-md'
                            }`}
                        onClick={() => setUseHighRated(true)}
                    >
                        High rated
                    </button>
                </div>
            )}
            
            <ResponsiveContainer width="100%" height={(isMobile ? 300 : 400)}>
                <BarChart data={displayData} margin={margins}>
                    <XAxis
                        dataKey={label}
                        interval={0}
                        angle={-30}
                        textAnchor="end"
                        tick={{ fill: 'black', fontSize: (isMobile ? "8px" : "12px") }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill={color} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraph;
