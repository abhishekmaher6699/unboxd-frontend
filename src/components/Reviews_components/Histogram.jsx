import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function ReviewsHistogram({data}) {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        toolbar: { show: false },
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 1,
          horizontal: false,
          columnWidth: '100%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false, 
      },
      xaxis: {
        title: {
          text: 'Number of Likes',
          style: {
            fontFamily: 'Oswald, sans-serif',  
            fontSize: '12px', 
            fontWeight: 'light', 
            color: '#333',  
          },
        },
        categories: [],
        tickAmount: 10, 
      },
      yaxis: {
        title: {
          text: 'Number of Reviews',
          style: {
            fontFamily: 'Oswald, sans-serif',  
            fontSize: '12px', 
            fontWeight: 'light', 
            color: '#333',  
          },
        },
      },
      title: {
        text: 'Number of Likes on Reviews',
        align: 'center',
        style: {
            fontFamily: 'Oswald, sans-serif',  
            fontSize: '16px', 
            fontWeight: 'light', 
            color: '#333',  
          },
      },
    },
  });


  useEffect(() => {
    const likesCount = [];
    Object.values(data).forEach((movieReviews) => {
      movieReviews.forEach((review) => {
        likesCount.push(review.liked_by.length);
      });
    });

    const frequencyMap = {};
    likesCount.forEach((count) => {
      frequencyMap[count] = (frequencyMap[count] || 0) + 1;
    });

    const categories = Object.keys(frequencyMap).map(Number);
    const frequencies = Object.values(frequencyMap);
    
    setChartData((prevState) => ({
      ...prevState,
      series: [{ name: 'Reviews', data: frequencies }],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories,
        },
      },
    }));
  }, []);

  return (
    <div className='bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6 w-[90%] md:w-[80%] lg:w-[50%]'>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}

export default ReviewsHistogram;
