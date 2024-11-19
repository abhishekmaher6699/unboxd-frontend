import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StatsLoading from './stats_components/StatsLoading';
import StatsError from './stats_components/Error';
import Friends_List from './Friends_component/Friends_List';
import RecommendationsList from './Friends_component/Recomendations';
import { FaGithub } from 'react-icons/fa';
import { TWO_DAYS_MS } from '../utils/objects';
import {setfriendsUsername, fetchfriendsData } from '../redux/unboxd_redux';
import OutdatedData from './OutdatedData';

function Network() {
  const navigate = useNavigate();
  const location = useLocation();
  const { friends, friends_username, friends_loading, friends_error } = useSelector((state) => state.data);
  const [data, setData] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('');
  const [fetchedAtTime, setFetchedAtTime] = useState(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const [isLoadingFromRedux, setIsLoadingFromRedux] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("current_friends_username");
    const isUsername = location.state?.username || friends_username || storedUsername;

    if (!isUsername) {
      navigate('/', { state: { navOption: 'friends' } });
      return;
    }

    setIsLoadingFromRedux(
      (friends_loading) ||
      (location.state?.username && location.state.username !== storedUsername)
    );

    let username;
    if (location.state?.username) {
      username = location.state.username;
      localStorage.setItem("current_friends_username", username);
    } else if (friends_username) {
      username = friends_username;
      localStorage.setItem("current_friends_username", username);
    } else {
      username = storedUsername;
    }

    setCurrentUsername(username);

    if (friends) {
      setData(friends);
      setShowRefresh(false)
    } else if (username) {
      const localStorageKey = `${username}_friends_data`;
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
          setData(parsedData);
        } else {
          localStorage.removeItem(localStorageKey);
          setIsLoadingFromRedux(true);
          setData(null);
        }
      }
    }
  }, [friends_username, friends, friends_loading, location.state]);

  if ((!data && currentUsername) && !location.state?.username && !isLoadingFromRedux) {
    localStorage.removeItem("current_friends_username")
    return <StatsError error={friends_error} />
  }

  if (friends_error) {
    localStorage.removeItem("current_friends_username")
    return <StatsError error={friends_error} />
  }

  if (friends_loading && isLoadingFromRedux) {
    if (data) {
      setData(null)
    }
    return <StatsLoading />;
  }

  return (
    <div className='w-full relative flex flex-col z-10 items-center justify-center mb-10 md:mb-0'>
      <a
        href="https://github.com/abhishekmaher6699"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-10 top-4 sm:top-7 right-4 sm:right-5 text-gray-900 hover:text-gray-700 transition-colors duration-200"
        aria-label="GitHub Repository"
      >
        <FaGithub size={30} />
      </a>
      {data && (
        <div className='flex flex-col gap-3 items-center justify-center w-full'>

          <div className='text-center'>
            <p className=' text-[40px] md:text-[60px] font-bebas tracking-tight text-gray-900 p-0'>
              UnBoxd
            </p>
          </div>
          {showRefresh && (
              <OutdatedData fetchFunc={fetchfriendsData} fetchedAtTime={fetchedAtTime} currentUsername={currentUsername} setShowRefresh={setShowRefresh}/>
          )}
          <div>
            <p className='font-oswald text-xl sm:text-2xl'>{currentUsername}</p>

          </div>
          <div className='w-[90%] md:w-[80%] lg:w-[50%]'>
            <Friends_List data={data.rankings} />
          </div>
          <div className='w-[90%] md:w-[80%] lg:w-[50%]'>
            <RecommendationsList data={data.reccomendations} />
          </div>
        </div>
      )}

      <div className='-z-10 h-[90vw] w-[90vw] md:h-[40vw] md:w-[40vw] sm:h-[70vw] sm:w-[70vw] fixed bg-red-600 rounded-full translate-x-1/3 -translate-y-1/3 top-0 right-0'></div>
      <div className='-z-10 h-[75vw] w-[75vw] md:h-[25vw] md:w-[25vw] sm:h-[70vw] sm:w-[70vw] fixed bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 bottom-0 right-0'></div>
      <div className='-z-10 h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw] sm:h-[60vw] sm:w-[60vw] fixed bg-green-600 rounded-full -translate-x-1/3 translate-y-1/3 bottom-0 left-0'></div>
    </div>
  );
}

export default Network;
