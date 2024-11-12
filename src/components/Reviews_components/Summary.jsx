import React, {useState} from 'react'

function Summary({ data }) {    
    const number = Object.keys(data).length

  return (
    <div className=' bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6 w-[90%] md:w-[80%] lg:w-[50%]'>
        <p className='font-oswald text-lg text-gray-700 text-center'>You have reviewed <span className='text-8xl font-extrabold text-green-600'>{number}</span> movies</p>
    </div>
  )
}

export default Summary