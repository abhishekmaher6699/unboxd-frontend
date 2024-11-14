import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function RatingsGraph({ data, isMobile }) {
    const [isMounted, setIsMounted] = useState(false);
    const ratingBins = [1, 2, 3, 4, 5];

    const ratingData = ratingBins.map(rating => {
        const liked = data.filter(movie => movie.user_rating === rating && movie.is_liked).length;
        const notLiked = data.filter(movie => movie.user_rating === rating && !movie.is_liked).length;
        return { liked, notLiked };
    });

    const likedData = ratingData.map(d => d.liked);
    const notLikedData = ratingData.map(d => d.notLiked);

    const chartOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            background: 'transparent',
        },
        grid: { show: false },
        colors: ['#f92306', '#22c55e'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ratingBins,
            title: {
                text: 'Rating',
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '12px',
                    fontWeight: 'light',
                    color: '#374151',
                },
            },
            labels: { style: { colors: '#374151' } },
        },
        yaxis: {
            title: {
                text: 'Count',
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '12px',
                    fontWeight: 'light',
                    color: '#374151',
                },
            },
            labels: { style: { colors: '#374151' } },
        },
        tooltip: {
            enabled: true,
            style: { fontSize: '14px' },
            y: { formatter: (val) => `${val} movies` },
        },
        legend: { show: false },
        title: {
            text: 'Rating Count',
            align: 'center',
            style: {
                fontFamily: 'Oswald, sans-serif',
                fontSize: '16px',
                fontWeight: 'light',
                color: '#374151',
            },
        },
    };

    const chartSeries = [
        { name: 'Not Liked', data: notLikedData },
        { name: 'Liked', data: likedData },
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div style={{ height: isMobile ? '300px' : '400px' }}>
            {isMounted && (
                <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height="100%"
                />
            )}
        </div>
    );
}

export default RatingsGraph;
