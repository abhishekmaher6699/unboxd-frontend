import React from 'react'
import {useDispatch } from 'react-redux';

function OutdatedData({ fetchedAtTime, fetchFunc, setShowRefresh, currentUsername }) {

    const dispatch = useDispatch();

    const handleUpdate = (event) => {
        event.preventDefault();
        if (currentUsername) {
            dispatch(fetchFunc({ username: currentUsername, forceRefresh: true }))
            setShowRefresh(false)
        }
    }

    return (
        <div className="border border-red-500 p-4 w-[90%] md:w-[40%]  rounded-md text-center mt-4">
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
                    onClick={() => { setShowRefresh(false) }}>
                    Close
                </button>
            </div>

        </div>
    )
}

export default OutdatedData