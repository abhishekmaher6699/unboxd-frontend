import { color } from 'd3';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

function RatingDiff({ data, isMobile }) {
  // Process the data to create histogram bins
  const rating_diff_data = data.rating_diff;
  const minValue = Math.min(...rating_diff_data);
  const maxValue = Math.max(...rating_diff_data);
  
  // Create histogram bins
  const binCount = 10;
  const binWidth = (maxValue - minValue) / binCount;
  
  // Create bins and count frequencies
  const bins = Array(binCount).fill(0);
  rating_diff_data.forEach(value => {
    const binIndex = Math.min(Math.floor((value - minValue) / binWidth), binCount - 1);
    bins[binIndex]++;
  });

  // Create bin labels
  const binLabels = Array(binCount).fill(0).map((_, i) => {
    const start = (minValue + (i * binWidth)).toFixed(1);
    const end = (minValue + ((i + 1) * binWidth)).toFixed(1);
    return `${start}`;
  });

  const series = [{
    name: 'Frequency',
    data: bins,
    color: '#0FFF50'
  }];

  const options = {
    chart: {
        type: 'bar',
        toolbar: { show: false },
        // height: 300,
      },
      plotOptions: {
        bar: {
          borderRadius: 1,
          horizontal: false,
          columnWidth: '100%',
        },
      },
      grid: {
        show: false, 
      },
    title: {
      text: 'User rating vs Total rating',
      align: 'center',
      style: {
        fontFamily: 'Oswald, sans-serif',  
        fontSize: '16px', 
        fontWeight: 'light', 
        color: 'white',
      }
    },
    xaxis: {
      categories: binLabels,
      labels: {
        style: { 
          fontSize: '12px',
          colors: '#FFFFFF'
        },
        rotate: 0
      },
      axisBorder: {
        color: '#FFFFFF'
      },
      axisTicks: {
        color: '#FFFFFF'
      },
      title: {
        text: 'Rating Difference',
        style: {
            fontFamily: 'Oswald, sans-serif',  
            fontSize: '12px', 
            fontWeight: 'light', 
            color: 'white',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '14px'
        }
      },
      title: {
        text: 'Frequency',
        style: {
            fontFamily: 'Oswald, sans-serif',  
            fontSize: '12px', 
            fontWeight: 'light', 
            color: 'white',
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },

  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        // width={600}
        height={(isMobile ? 250 : 400)}
      />
    </div>
  );
}

export default RatingDiff;