import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Rating from './stats_components/Rating';
import CountryTab from './stats_components/CountryTab';
import Achievements from './stats_components/Achievements';
import LogActivityLine from './stats_components/LogActivityLine';
import LiketoWatchList from './stats_components/LiketoWatchList';
import Runtime from './stats_components/Runtime';
import HighRatedThemes from './stats_components/HighRatedThemes';
import BarGraph from './stats_components/BarGraph';
import ChoroplethMap from './stats_components/Map';
import Timeline from './stats_components/TimeLine';
import MovieList from './stats_components/MovieList';
import Scores from './stats_components/Scores';
import UserType from './stats_components/UserType';
import Screenshots from './stats_components/Screenshots';
import StatsLoading from './stats_components/StatsLoading';
import StatsError from './stats_components/Error';
import { FaGithub } from 'react-icons/fa'; 
import MapSection from './stats_components/MapSection';
import { TWO_DAYS_MS } from '../utils/objects';
import { fetchStatsData } from '../redux/unboxd_redux';

function Stats() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { stats, stats_username, stats_loading, stats_error } = useSelector((state) => state.data);
  const [data, setdata] = useState(null)
  const [currentUsername, setCurrentUsername] = useState('');
  const [isLoadingFromRedux, setIsLoadingFromRedux] = useState(false);
  const [fetchedAtTime, setFetchedAtTime] = useState(null);
  const [showRefresh, setShowRefresh] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (currentUsername){
      dispatch(fetchStatsData({ username: currentUsername, forceRefresh: true }))
      setShowRefresh(false)
    }
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("current_stats_username");
    const isUsername = location.state?.username || stats_username || storedUsername;

    if (!isUsername) {
      navigate('/', { state: { navOption: 'stats' } });
      return;
    }

    setIsLoadingFromRedux(
      (stats_loading) ||
      (location.state?.username && location.state.username !== storedUsername)
    );

    let username;
    if (location.state?.username) {
      username = location.state.username;
      localStorage.setItem("current_stats_username", username);
    } else if (stats_username) {
      username = stats_username;
      localStorage.setItem("current_stats_username", username);
    } else {
      username = storedUsername;
    }

    setCurrentUsername(username); 

    if (stats) {
      setdata(stats)
      setShowRefresh(false)
    } else if (username) {
      const localStorageKey = `${username}_movie_data`;
      const cachedData = localStorage.getItem(localStorageKey);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const fetchedAt = new Date(parsedData.fetchedAt).getTime();
        const currentTime = Date.now();

        setFetchedAtTime(new Date(parsedData.fetchedAt).toLocaleString());
        if (currentTime - fetchedAt >= 1 * 60 * 60 * 24 * 1000 && currentTime - fetchedAt < TWO_DAYS_MS) {
          setShowRefresh(true)
        }

        if (currentTime - fetchedAt < TWO_DAYS_MS) {
          setdata(parsedData);

        } else {
          localStorage.removeItem(localStorageKey);
          setIsLoadingFromRedux(true);
          setdata(null);
        }
      }
    }
  }, [stats_username, stats, stats_loading, location.state]);

  if (!data && currentUsername  && !location.state?.username && !isLoadingFromRedux) {
    localStorage.removeItem("current_stats_username")
    return <StatsError error={stats_error}/>
  }

  if (stats_error) {
    localStorage.removeItem("current_stats_username")
    return <StatsError error={stats_error}/>;
  }

  if (stats_loading && isLoadingFromRedux) {
    return <StatsLoading />;
  }

  return (
    <div className='w-full relative flex flex-col z-10 items-center justify-center mb-10 md:mb-0'>
      <a
        href="https://github.com/abhishekmaher6699"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-50 top-7 right-5 text-gray-900 hover:text-gray-700 transition-colors duration-200"
        aria-label="GitHub Repository"
      >
        <FaGithub size={30} />
      </a>
      {data && (
        <div className='z-10 flex flex-col w-full mb-14 sm:mb-0 items-center'>
          {/* Title */}
          <div>
            <p className=' text-[40px] md:text-[60px] font-bebas tracking-tight text-gray-900 p-0'>UnBoxd</p>
          </div>
          {/* Basic Info */}
          {showRefresh && (
            <div className="border border-red-500 p-4 w-[90%] md:w-[40%] mb-4 rounded-md text-center mt-4">
              <h1 className='text-gray-700 mb-2 lext'>Outdated Data!</h1>
              <p className="text-gray-700 mb-2">
                This data was fetched on <span className="font-semibold">{fetchedAtTime}</span>.
              </p>
              <p className="text-gray-700 mb-2">
                You can update it if you have made any changes in you LB profile.
              </p>
              <div className='flex flex-row gap-5 justify-center'>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
              onClick={() => {setShowRefresh(false)}}>
                Close
              </button>
              </div>

            </div>
          )}
          <div className='w-full bg-gray-600 p-10 flex flex-col items-center gap-5 bg-opacity-50'>
            <div className='flex flex-col items-center gap-4'>
              <div className='rounded-full w-20 h-20 md:w-24 md:h-24 overflow-hidden shadow-xl'>
                <img src={data.processed_data.basic_info.profile_pic} alt="" className='w-full h-full object-cover' />
              </div>
              <h1 className='font-oswald text-xl sm:text-2xl text-white'>{data.processed_data.basic_info.profile_name}</h1>
            </div>

            <div className='w-[90%] md:w-[80%] lg:w-[50%]'>
              <ul className='flex gap-0 flex-wrap'>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 py-1 flex-1 border-r rounded-l-lg'>
                  <p className='font-oswald md:text-xl text-gray-800 mb-1 md:mb-2 md:h-12 lg:h-8'>Total movies</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.movie_count}</p>
                </li>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 py-1 flex-1 border-r'>
                  <p className='font-oswald md:text-xl text-gray-800 mb-1 md:mb-2 md:h-12 lg:h-8'>Liked movies</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.liked_movie_count}</p>
                </li>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 py-1 flex-1 border-r'>
                  <p className='font-oswald md:text-xl text-gray-800  mb-1 md:mb-2 md:h-12 lg:h-8 '>Rated movies</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.rated_movie_count}</p>
                </li>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 py-1 flex-1 rounded-r-lg'>
                  <p className='font-oswald md:text-xl  text-gray-800  mb-1 md:mb-2 md:h-12 lg:h-8 '>Reviewed movies</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.reviewed_movie_count}</p>
                </li>
              </ul>
            </div>

            <div className='w-[90%] md:w-[80%] lg:w-[50%]'>
              <ul className='flex lg:flex-wrap flex-col md:flex-row'>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 md:y-2 sm:py-1 flex-1 md:border-r md:rounded-l-lg rounded-t-lg  md:rounded-tr-none'>
                  <p className='font-oswald  md:text-xl text-gray-900 mb-1 md:mb-2 md:h-12 lg:h-8'>Movies from LB top 250</p>
                  <p className='font-number text-2xl md:text-3xl font-bold text-white'>{data.processed_data.basic_info.top250_movie_count}</p>
                </li>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 md:y-2 sm:py-1  flex-1 md:border-r'>
                  <p className='font-oswald  md:text-xl  text-gray-900 mb-1 md:mb-2 md:h-12 lg:h-8'>No. of languages explored</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.language_count}</p>
                </li>
                <li className='text-center bg-slate-600 bg-opacity-30 px-3 pb- md:pb-0 md:py-2 sm:py-1  flex-1 md:rounded-r-lg rounded-b-lg md:rounded-bl-none'>
                  <p className='font-oswald  md:text-xl  text-gray-900 mb-1 md:mb-2 md:h-12 lg:h-8'>No. of themes explored</p>
                  <p className='font-number text-2xl md:text-3xl font-semibold text-white'>{data.processed_data.basic_info.themes_count}</p>
                </li>
              </ul>
            </div>

            <Rating data={data} />
            <Achievements achievements={data.processed_data.achievements} />
            <CountryTab countries={data.processed_data.basic_info.countries_explored} />
            <LogActivityLine log_activity={data.processed_data.log_activity} />

          </div>
          {/* Aggregations */}
          <div className='lg:w-[50%] md:w-[80%] w-[80%] mt-5
          '>
            {/* Watch to likr ratios */}
            <div className='flex md:flex-row justify-between flex-col w-full mb-5 gap-2'>
              <LiketoWatchList movies={data.processed_data.like_to_watch.high} order={'ascending'} />
              <LiketoWatchList movies={data.processed_data.like_to_watch.low} order={'descending'} />
            </div>
            <div className='flex md:flex-row justify-between flex-col w-full mb-5 gap-2'>
              <Runtime movies={data.og_data} order={'ascending'} />
              <Runtime movies={data.og_data} order={'descending'} />
            </div>
            <HighRatedThemes themes={data.processed_data.high_rated_genres_and_themes.high_rated_themes} />
            <div className='mt-5'>
              <BarGraph data={data.og_data} rated_genre_data={data.processed_data.high_rated_genres_and_themes.high_rated_genres} title={"Your top 10 genres"} element={'genres'} items={10} />
              <div className='flex w-full lg:flex-row flex-col items-center justify-center lg:gap-5'>
                <BarGraph data={data.og_data} element={'director'} items={5} color={'#2563eb'} title={"Your Top 5 Directors"} />
                <BarGraph data={data.og_data} element={'actors'} items={5} color={'#16a34a'} title={"Your Top 5 Actors"} />
              </div>
              <BarGraph data={data.og_data} element={'original_language'} items={10} color={"#dc2626"} title={"Your Top 10 languages"} />
            </div>
            {/* map */}
            <MapSection  data={data.og_data} />
            {/* timeline */}
            <div>
              <Timeline monthlySummary={data.processed_data.monthly_summary} />
            </div>
            <div>
              <Scores data={data.processed_data} />
            </div>
            <div className='w-full flex justify-center'>
              <UserType type={data.processed_data.user_type} />
            </div>
            <div>
              <Screenshots data={data} />
            </div>
          </div>
        </div>
      )}

      <div className='-z-10 h-[90vw] w-[90vw] md:h-[40vw] md:w-[40vw] sm:h-[70vw] sm:w-[70vw] fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0'></div>
      <div className='-z-10 h-[75vw] w-[75vw] md:h-[25vw] md:w-[25vw] sm:h-[70vw] sm:w-[70vw] fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0'></div>
      <div className='-z-10 h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw] sm:h-[60vw] sm:w-[60vw] fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0'></div>

    </div>
  )
}

export default Stats