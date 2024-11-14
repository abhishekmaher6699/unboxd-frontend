import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function LogActivityLineChart({ log_activity }) {
    const data = Object.entries(log_activity).map(([date, count]) => ({
        date,
        count
    }));

    const tooltipStyle = {
        backgroundColor: '#1f2937', // Dark gray background
        color: 'white',
        borderRadius: '8px',
        padding: '10px',
        border: 'none', // Removed border for a sleeker look
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Adds depth to the tooltip
    };

    const [chartConfig, setChartConfig] = useState({
        marginLeft: 0,
        tickFontSize: 14,
    });

    useEffect(() => {
        const updateConfig = () => {
            if (window.innerWidth <= 768) {
                setChartConfig({
                    marginLeft: -25,
                    tickFontSize: 10,
                });
            } else {
                setChartConfig({
                    marginLeft: 0,
                    tickFontSize: 12,
                });
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    return (
        <div className='w-[90%] md:w-[80%] lg:w-[50%] h-56 md:h-96 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg pt-4 md:py-8 px-5 flex flex-col gap-2'>
            <p className='font-oswald text-center text-gray-700 text-lg md:text-xl'>Log Activity</p>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 0, right: 0, bottom: 10, left: chartConfig.marginLeft }}>
                    <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#9ca3af', fontSize: chartConfig.tickFontSize }} 
                        tickLine={false} // Removes tick line for a cleaner look
                        axisLine={{ stroke: '#4b5563' }} // Soft gray axis line
                    />
                    <YAxis 
                        domain={[0, 'dataMax+20']} 
                        tick={{ fill: '#9ca3af', fontSize: chartConfig.tickFontSize }} 
                        tickLine={false} 
                        axisLine={{ stroke: '#4b5563' }} 
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="gray" 
                        strokeWidth={2} 
                        dot={{ fill: 'white', stroke: '#333', r: 4 }} 
                        activeDot={{
                            r: 6,
                            fill: '#e11d48',
                            stroke: '#e11d48',
                            onClick: (e) => {},
                        }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LogActivityLineChart;
