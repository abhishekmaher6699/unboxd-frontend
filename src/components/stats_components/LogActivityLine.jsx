import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function LogActivityLineChart({ log_activity }) {
    const data = Object.entries(log_activity).map(([date, count]) => ({
        date,
        count
    }));

    const tooltipStyle = {
        backgroundColor: '#1f2937',
        color: 'white',
        borderRadius: '8px',
        padding: '10px',
        border: 'none',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    };

    const [chartConfig, setChartConfig] = useState({
        marginLeft: 0,
        tickFontSize: 14,
        chartWidth: Math.max(data.length * 60, window.innerWidth * 0.5)
    });

    useEffect(() => {
        const updateConfig = () => {
            const calculatedWidth = Math.max(data.length * 60, window.innerWidth * 0.5);
            
            setChartConfig({
                marginLeft: window.innerWidth <= 768 ? -40 : -25,
                tickFontSize: window.innerWidth <= 768 ? 10 : 14,
                chartWidth: calculatedWidth
            });
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, [data.length]);

    return (
        <div className='w-[90%] md:w-[80%] lg:w-[50%] h-56 md:h-96 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-4'>
            <p className='font-oswald text-center text-gray-700 text-lg md:text-xl mb-4'>Log Activity</p>
            
            <div 
                className='w-full h-full pb-5 md:pb-8 overflow-x-auto' 
                style={{ 
                    overflowY: 'hidden' 
                }}
            >
                <ResponsiveContainer width={chartConfig.chartWidth} height="100%">
                    <LineChart 
                        data={data} 
                        margin={{ top: 0, right: 0, bottom: 10, left: chartConfig.marginLeft }}
                    >
                        <XAxis 
                            dataKey="date" 
                            tick={{ fill: '#9ca3af', fontSize: chartConfig.tickFontSize }} 
                            tickLine={false} 
                            axisLine={{ stroke: '#4b5563' }}
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
        </div>
    );
}

export default LogActivityLineChart;