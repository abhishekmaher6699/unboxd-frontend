import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { Type, userTypeColors } from '../../utils/objects';

function getSortedElements(data, element, max = 5) {
    const allElements = data.flatMap(movie => movie[element]);
    const elementCounts = allElements.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(elementCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, max);
}

function Screenshots({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = ''; 
        };
    }, []);

    const downloadImage = async (id) => {
        const element = document.getElementById(id);
        if (element) {
            try {
                const canvas = await html2canvas(element, {
                    scale: 3,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    windowWidth: element.scrollWidth,
                    windowHeight: element.scrollHeight,
                    removeContainer: false,
                    allowTaint: true
                });

                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png', 1.0);
                link.download = `${id}.png`;
                link.click();
            } catch (err) {
                console.error('Error generating image:', err);
            }
        }
    };

    const top_directors = getSortedElements(data.og_data, 'director');
    const total_dir = new Set(data.og_data.flatMap(movie => movie.director)).size;
    const top_actors = getSortedElements(data.og_data, 'actors');
    const color = userTypeColors[data.processed_data.user_type];
    const countries = getSortedElements(data.og_data, 'countries');
    const count_len = (data.processed_data.basic_info.countries_explored).length;
    const languages = getSortedElements(data.og_data, 'spoken_languages');
    const language_count = data.processed_data.basic_info.language_count


    return (
        <div className='text-center m-10'>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white py-3 px-5 rounded hover:bg-opacity-80">
                Share
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center h-[100vh] bg-black bg-opacity-50 overflow-y-auto">
                    <button onClick={() => setIsOpen(false)} className="text-white font-bold p-2 rounded absolute top-0 right-0">
                        <FontAwesomeIcon icon={faTimes} size="xl" />
                    </button>
                    <div className='flex gap-5 flex-col md:flex-row h-screen mt-20 md:mt-0'>
                        {/* Card 1 */}
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div
                                id='card-1'
                                className="bg-white z-10 overflow-hidden p-6 flex flex-col items-center"
                                style={{
                                    width: '400px',
                                    height: '530px',
                                    position: 'relative',
                                }}
                            >
                                <div className='z-10 flex flex-col items-center justify-center'>
                                    <p className='font-oswald text-lg leading-[1]'>I am a</p>
                                    <p className={`text-center font-extrabold leading-[1] mt-0 ${data.processed_data.user_type.split(' ').length > 1 ? 'text-5xl mb-6' : 'text-7xl mb-10'}`}>{Type[data.processed_data.user_type]}</p>
                                </div>

                                <div className='flex justify-between gap-5 z-10 w-full'>
                                    <div>
                                        <h2 className="text-start font-oswald text-lg font-semibold mb-2">Top Directors</h2>
                                        <ul className="mb-4 text-start">
                                            {top_directors.map(([name, count]) => (
                                                <li key={name}>
                                                    {name} - {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2 className="text-start font-oswald text-lg font-semibold mb-2">Top Actors</h2>
                                        <ul className="text-start">
                                            {top_actors.map(([name, count]) => (
                                                <li key={name}>
                                                    {name} - {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='z-10 flex w-full justify-between gap-5 mt-5'>
                                    <div className='text-start'>
                                        <h2 className='text-start font-oswald text-lg font-semibold'>Total Directors</h2>
                                        <p className='text-start text-2xl font-oswald'>{total_dir}</p>
                                    </div>
                                    <div>
                                        <h2 className='text-start font-oswald text-lg font-semibold'>Total Movies Watched</h2>
                                        <p className='text-start text-2xl font-oswald'>{data.processed_data.basic_info.movie_count}</p>
                                    </div>
                                </div>

                                <div className='z-10 text-start w-full mt-10 '>
                                    <p className='text-[40px] font-bebas'>UnBoxd</p>
                                </div>

                                <div className='-z-10 absolute h-64 w-64 fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0'></div>
                                <div className='-z-10 absolute h-60 w-60 fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0'></div>
                                <div className='-z-10 absolute h-56 w-56 fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0'></div>
                            </div>

                            <button onClick={() => { downloadImage('card-1') }} className="bg-blue-500 text-white p-2 rounded hover:bg-opacity-80 mx-2">
                                Download Card 1
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div
                                id='card-2'
                                className="bg-white z-10 overflow-hidden p-6 flex flex-col items-center"
                                style={{
                                    width: '400px',
                                    height: '530px',
                                    position: 'relative',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <div className='z-10 flex flex-col items-center'>
                                    <p className='font-oswald text-lg leading-[1]'>I am a</p>
                                    <p className={`text-center font-extrabold leading-[1] mt-0 ${data.processed_data.user_type.split(' ').length > 1 ? 'text-5xl mb-6' : 'text-7xl mb-10'}`}>{Type[data.processed_data.user_type]}</p>
                                </div>
                                <div className='flex justify-between gap-5 z-10 w-full'>
                                    <div className='w-[70%]'>
                                        <h2 className="text-start font-oswald text-lg font-semibold mb-2">Top countries</h2>
                                        <ul className="mb-4 text-start">
                                            {countries.map(([name, count]) => (
                                                <li key={name}>
                                                    {name} - {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='w-[50%]'>
                                        <h2 className="text-start font-oswald text-lg font-semibold mb-2">Top languages</h2>
                                        <ul className="text-start">
                                            {languages.map(([name, count]) => (
                                                <li key={name}>
                                                    {name} - {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='z-10 flex w-full justify-between gap-5 mt-5'>
                                    <div className='text-start'>
                                        <h2 className='text-start font-oswald text-lg font-semibold'>Countries Explored</h2>
                                        <p className='text-start text-2xl font-oswald'>{count_len}</p>
                                    </div>
                                    <div>
                                        <h2 className='text-start font-oswald text-lg font-semibold'>Total Languages</h2>
                                        <p className='text-start text-2xl font-oswald'>{language_count}</p>
                                    </div>
                                </div>

                                <div className='z-10 text-start w-full mt-5 '>
                                    <p className='text-[40px] font-bebas'>UnBoxd</p>
                                </div>

                                <div className='-z-10 absolute h-64 w-64 fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0'></div>
                                <div className='-z-10 absolute h-60 w-60 fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0'></div>
                                <div className='-z-10 absolute h-56 w-56 fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0'></div>
                            </div>

                            <button onClick={() => { downloadImage('card-2') }} className="bg-blue-500 text-white p-2 rounded hover:bg-opacity-80 mx-2 mb-24">
                                Download Card 2
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Screenshots;
