import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatsUsername, setReviewsUsername, setfriendsUsername, fetchStatsData, fetchReviewsData, fetchfriendsData } from '../redux/unboxd_redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { Info } from 'lucide-react';


function Home() {
    const [username, setusername] = useState('');
    const [navOption, setnavOption] = useState('stats');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const state = location.state;
        if (state && state.navOption) {
            setnavOption(state.navOption);
        }
    }, [location]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (username) {
            if (navOption === 'stats') {
                dispatch(setStatsUsername(username));
                dispatch(fetchStatsData({ username }));
            } else if (navOption === 'reviews') {
                dispatch(setReviewsUsername(username));
                dispatch(fetchReviewsData({ username }));
            } else if (navOption === 'friends') {
                dispatch(setfriendsUsername(username));
                dispatch(fetchfriendsData({ username }));
            }
            navigate(`/${navOption}`, { state: { username } });
        }
    };

    const placeholderText = {
        stats: "Enter your Letterboxd username to see profile stats...",
        reviews: "Enter your Letterboxd username to see reviews analysis...",
        friends: "Enter your Letterboxd username to see friends ranking...",
    }[navOption];

    return (
        <div className='h-[100vh] w-auto relative flex flex-col md:gap-10 gap-8 justify-center items-center overflow-hidden m-auto px-10'>
            <a
                href="https://github.com/abhishekmaher6699"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute z-10 top-4 sm:top-5 right-3 sm:right-5 text-gray-900 hover:text-gray-700 transition-colors duration-200"
                aria-label="GitHub Repository"
            >
                <FaGithub size={30} />
            </a>

            <div className='z-20 flex flex-col items-end p-0'>
                <p className='text-[80px] md:text-[150px] font-bebas tracking-tight text-gray-900'>UnBoxd</p>
                <p className='font-sans -mt-8 md:-mt-16 tracking-tighter text-lg text-sm md:text-xl'>by Abhishek Maher</p>
            </div>

            <div className='z-20 w-[80%] md:w-full mb-0 sm:mb-5'>
            <div className='max-w-md mx-auto flex justify-center items-center'>
                    <p className='text-md font-bebas text-gray-800'>Select the section you want to see</p>
                </div>
                <div className='flex z-20 max-w-md mx-auto'>
                    <button className={`font-sans py-2 md:py-2 flex-1 text-white rounded-l-full border-r transition-colors duration-100 ease-in-out ${navOption === 'stats' ? 'bg-blue-600' : 'bg-gray-700'
                        }`} onClick={() => setnavOption('stats')}> Stats </button>
                    <button className={`font-sans py-2 md:py-2 flex-1 text-white text-md trac transition-colors duration-100 ease-in-out ${navOption === 'reviews' ? 'bg-blue-600' : 'bg-gray-700'
                        }`} onClick={() => setnavOption('reviews')}> Reviews</button>
                    <button className={`font-sans py-2 md:py-2 flex-1 text-white rounded-r-full border-l transition-colors duration-100 ease-in-out ${navOption === 'friends' ? 'bg-blue-600' : 'bg-gray-700'
                        }`} onClick={() => setnavOption('friends')}> Friends </button>
                </div>
         
            </div>

            <form onSubmit={handleSearch} className='z-20 flex flex-col items-center w-full max-w-md'>
                <input
                    type="text"
                    className='placeholder:italic sm:placeholder:text-sm placeholder:text-xs w-[80%] md:w-full border border-slate-700 p-2 md:p-3 block rounded-2xl focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 text-xl font-sans'
                    value={username}
                    placeholder={placeholderText}
                    onChange={(e) => {
                        setusername(e.target.value);
                    }}
                />
                <div className=' w-[80%] md:w-full flex items-center gap-1 mt-1'>
                    <Info className="w-3 h-3 text-gray-800" />
                    <p className='text-xs italic font-semibold text-gray-800'>You need to enter username for every section</p>
                </div>
                <button type='submit' className='font-sans bg-blue-500 w-10 hover:bg-blue-700 text-white py-3 px-10 rounded w-[8rem] md:w-[8rem] mt-4'>Search</button>
            </form>

            <div className='z-0 h-[90vw] w-[90vw] md:h-[40vw] md:w-[40vw] sm:h-[70vw] sm:w-[70vw] absolute bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0'></div>
            <div className='h-[75vw] w-[75vw] md:h-[25vw] md:w-[25vw] sm:h-[70vw] sm:w-[70vw] absolute bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0'></div>
            <div className='h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw] sm:h-[60vw] sm:w-[60vw] absolute bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0'></div>
        </div>
    );
}

export default Home;
