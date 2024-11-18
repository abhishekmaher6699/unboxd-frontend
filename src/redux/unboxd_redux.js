import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TWO_DAYS_MS } from '../utils/objects';

function logUsername(username) {
    fetch('https://script.google.com/macros/s/AKfycbzNWabnApLvMeDvwB9jD9sx8DVPIa4Q2YYX-yE0RzVc7Wh-vcsABcaQXz5C6cWqe1yfTg/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username}),
      mode: 'no-cors'

    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

export const fetchStatsData = createAsyncThunk('data/fetchStatsData', async ({ username, forceRefresh = false }) => {
    const localStorageKey = `${username}_movie_data`;
    const cachedData = localStorage.getItem(localStorageKey);
    
    if (cachedData && !forceRefresh) {
        const parsedData = JSON.parse(cachedData);
        const fetchedAt = new Date(parsedData.fetchedAt).getTime();
        const currentTime = Date.now();
        if (currentTime - fetchedAt < TWO_DAYS_MS) {
            return parsedData;
        }
    }
    
    try {
        const response = await axios.get(`https://unboxd-backend-4.onrender.com/movies-data/?user=${username}`);
        const data = response.data;
        logUsername(username+" success")
        const timestamp = new Date().toISOString();
        localStorage.setItem(localStorageKey, JSON.stringify({ ...data, fetchedAt: timestamp }));
        return data;
    } catch (error) {
        if (error.response?.data?.detail == "Stat_404") {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error("User doesn't exist")
        } else if (error.response?.data?.detail == "Stat_400") {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('You must watch atleast 20 movies')
        }else  {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('Failed to fetch data')
        }
        
    }
});

export const fetchReviewsData = createAsyncThunk('data/fetchReviewsData', async ({ username, forceRefresh = false }) => {
    const localStorageKey = `${username}_review_data`;
    const cachedData = localStorage.getItem(localStorageKey);
    
    if (cachedData && !forceRefresh) {
        const parsedData = JSON.parse(cachedData);
        const fetchedAt = new Date(parsedData.fetchedAt).getTime();
        const currentTime = Date.now();
        if (currentTime - fetchedAt < TWO_DAYS_MS) {
            return parsedData;
        }
    }

    try {
        const response = await axios.get(`https://unboxd-backend-4.onrender.com/reviews/?user=${username}`);
        const data = response.data;
        logUsername(username+" success")
        const timestamp = new Date().toISOString();
        localStorage.setItem(localStorageKey, JSON.stringify({ reviews: data, fetchedAt: timestamp }));
        return { reviews: data, fetchedAt: timestamp };
    } catch (error) {
        if (error.response?.data?.detail == "Review_400") {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('You must review atleast 10 movies')
        } 
        else {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('Failed to fetch data');
        }
    }
});

export const fetchfriendsData = createAsyncThunk('data/fetchfriendsData', async ({ username, forceRefresh = false }) => {
    const localStorageKey = `${username}_friends_data`;
    const cachedData = localStorage.getItem(localStorageKey);
    
    if (cachedData && !forceRefresh) {
        const parsedData = JSON.parse(cachedData);
        const fetchedAt = new Date(parsedData.fetchedAt).getTime();
        const currentTime = Date.now();
        if (currentTime - fetchedAt < TWO_DAYS_MS) {
            return parsedData;
        }
    }

    try {
        const response = await axios.get(`https://unboxd-backend-4.onrender.com/rank?user=${username}&group=both`);
        const data = response.data;
        logUsername(username+" success")
        const timestamp = new Date().toISOString();
        localStorage.setItem(localStorageKey, JSON.stringify({ ...data, fetchedAt: timestamp }));
        return data;
    } catch (error) {
        if (error.response?.data?.detail == "Rank_404") {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error("User doesn't exist");
        } else if (error.response?.data?.detail == "Rank_400") {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('You must watch atleast 20 movies')
        }
        else {
            logUsername(username+ " " + error.response?.data?.detail)
            throw new Error('Failed to fetch data');
        }
    }
});

export const appSlice = createSlice({
    name: 'unboxd',
    initialState: {
        stats_username: null, 
        reviews_username: null,
        friends_username: null,
        stats: null,
        reviews: null,
        friends: null,
        stats_loading: false,
        stats_error: null,
        reviews_loading: false,
        reviews_error: null,
        friends_loading: false,
        friends_error: null
    },
    reducers: {
        setStatsUsername: (state, action) => {
            state.stats_username = action.payload; 
        },
        setReviewsUsername: (state, action) => {
            state.reviews_username = action.payload; 
        },
        setfriendsUsername: (state, action) => {
            state.friends_username = action.payload; 
        },
        clearFriendsData: (state) => {
            state.friends = null;
            state.friends_error = null;
            state.friends_loading = true;
        },
        clearStatsData: (state) => {
            state.stats = null;
            state.stats_error = null;
            state.stats_loading = true;
        },
        clearReviewsData: (state) => {
            state.reviews = null;
            state.reviews_error = null;
            state.reviews_loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatsData.pending, (state) => {
                state.stats_loading = true;
                state.stats_error = null;
            })
            .addCase(fetchStatsData.fulfilled, (state, action) => {
                state.stats_loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchStatsData.rejected, (state, action) => {
                state.stats_loading = false;
                state.stats_error = action.error.message;
            })
            .addCase(fetchReviewsData.pending, (state) => {
                state.reviews_loading = true;
                state.reviews_error = null;
            })
            .addCase(fetchReviewsData.fulfilled, (state, action) => {
                state.reviews_loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsData.rejected, (state, action) => {
                state.reviews_loading = false;
                state.reviews_error = action.error.message;
            })
            .addCase(fetchfriendsData.pending, (state) => {
                state.friends_loading = true;
                state.friends_error = null;
            })
            .addCase(fetchfriendsData.fulfilled, (state, action) => {
                state.friends_loading = false;
                state.friends = action.payload;
            })
            .addCase(fetchfriendsData.rejected, (state, action) => {
                state.friends_loading = false;
                state.friends_error = action.error.message;
            });
    }
});

export const { setStatsUsername, setReviewsUsername, setfriendsUsername, clearFriendsData, clearReviewsData, clearStatsData } = appSlice.actions;
export default appSlice.reducer;
